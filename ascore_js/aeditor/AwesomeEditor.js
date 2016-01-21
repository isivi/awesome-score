import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';

import Message from './Message';
import './AwesomeEditor.less';
import executeCode from './execute-code';
import combineTexts from './combine-texts';

// Require without any module loading, nor executing
const initialCode = require('!!raw!./initial-code.js');
const finalCode = require('!!raw!./final-code.txt');

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
    code: initialCode,
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
  animateEditorCoverage() {
    let intervalsCounter = 0;
    let intervalID;
    const interval = 50;
    const totalAnimationTime = 2400;
    const { successCode } = this.state;
    const { orig, upd } = combineTexts({ orig: successCode, upd: finalCode });
    const newFinalCode = upd;
    const newSuccessCode = orig;

    function animate() {
      intervalsCounter++;
      const elapsedTime = intervalsCounter * interval;
      const border = newFinalCode.length * elapsedTime / totalAnimationTime;
      this.setState({
        code: newFinalCode.substr(0, border) + newSuccessCode.substr(border)

      });
      if (elapsedTime >= totalAnimationTime) {
        this.setState({ code: newFinalCode });
        clearInterval(intervalID);
      }
    }

    intervalID = setInterval(animate.bind(this), interval);
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
