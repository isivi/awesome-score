import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';

import Message from './Message';
import './AwesomeEditor.less';
import executeCode from './execute-code';
import combineTexts from './combine-texts';

// Require without any module loading, nor executing
const initialCodeConst = require('!!raw!./initial-code.js');
const finalCodeConst = require('!!raw!./final-code.txt');

// Theme
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';

// Folding
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/brace-fold';


export default class AwesomeEditor extends Component {
  static propTypes = {};
  state = {
    code: initialCodeConst,
    successCode: '',
    ready: false,
    success: false,
    message: '',
    messageVisible: false
  };

  updateCode(newCode) {
    this.setState({
      code: newCode
    });
  }
  submitCode() {
    if (!this.state.success) {
      this.showProcessMessage();
      setTimeout(
        () => {
          executeCode(this.state.code, this.handleExecution.bind(this));
        }, 500);
    } else {
      this.triggerSuccessEvent();
    }
  }
  handleExecution(executionResult) {
    this.showResultMessage(executionResult);

    if (executionResult.success) {
      this.setState({ successCode: this.state.code });
      this.animateEditorCoverage();
      this.triggerSuccessEvent();
    }
  }

  showProcessMessage() {
    this.setState({
      ready: false,
      messageVisible: true,
      message: 'Processing...'
    });
  }
  showResultMessage(executionResult) {
    let message;
    if (executionResult.success) {
      message = 'Well done';
    } else {
      message = `${executionResult.errorName}: ${executionResult.errorMessage}`;
    }
    this.setState({
      ready: true,
      success: executionResult.success,
      messageVisible: true,
      message
    });
  }
  closeMessage() {
    this.setState({ messageVisible: false });
  }

  triggerSuccessEvent() {
    this.refs.componentNode.dispatchEvent(
      new Event('execute', { bubbles: true })
    );
  }
  normalizeCodeBeforeAnimation() {
    const { orig: successCode, upd: finalCode } = combineTexts({ orig: successCode, upd: finalCodeConst });
    this.setState({ successCode, finalCode });
  }
  animateEditorCoverage() {
    this.normalizeCodeBeforeAnimation();

    let animation = new Animation(this.updateCode.bind(this), this.state);
    animation.start();
  }


  render() {
    const options = {
      mode: 'javascript',
      theme: 'dracula',

      lineNumbers: false,
      lineWrapping: true,

      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      readOnly: this.state.success
    };
    return (
      <div className="AwesomeEditor-component" ref="componentNode">
        <CodeMirror
          value={this.state.code}
          onChange={this.updateCode.bind(this)}
          options={options}
        />
        <Message
          handleClose={this.closeMessage.bind(this)}
          visible={this.state.messageVisible}
          ready={this.state.ready}
          success={this.state.success}
          message={this.state.message}
        />
        <button onClick={this.submitCode.bind(this)}>Submit</button>
      </div>
    );
  }
}


class Animation extends Object {
  totalAnimationTime = 2400;
  intervalsCounter = 50;
  interval = null;
  intervalID = null;
  creator = null;
  code = null;

  construct(updateCode, { successCode, finalCode }){
    this.updateCode = updateCode;
    this.interval = interval;
    this.code = {success: successCode, final: finalCode}
  }

  start(){
    this.intervalID = setInterval(this.tick.bind(this), this.interval);
  }

  tick() {
    this.intervalsCounter++;
    const elapsedTime = this.intervalsCounter * this.interval;
    const border = this.code.final.length * elapsedTime / this.totalAnimationTime;

    if (elapsedTime >= this.totalAnimationTime) {
      this.stop();
    } else {
      this.creator.updateCode(
        this.code.final.substr(0, border) + this.code.success.substr(border)
      );
    }
  }

  stop() {
    this.updateCode(this.code.finalCode);
    clearInterval(this.intervalID);
  }
}