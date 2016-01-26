import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';

import Message from './Message';
import CodeAnimation from './CodeAnimation';
import CodeExecutor from './CodeExecutor';
import normalizeTexts from './normalize-texts';
import './AwesomeEditor.less';

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
    executing: false,
    success: false,

    code: initialCodeConst,
    successCode: null,

    message: null,
    messageVisible: false
  };
  executingDelay = 400;
  maxColumns = 88;

  updateCode(newCode) {
    this.setState({
      code: newCode
    });
  }
  submitCode() {
    if (!this.state.success) {
      this.showExecutingMessage();
      setTimeout(
        () => {
          new CodeExecutor(this.state.code, this.handleExecution.bind(this)).execute();
        }, this.executingDelay);
    }
  }
  handleExecution(executionResult) {
    const success = executionResult.success;

    if (success) {
      this.setState({ success, successCode: this.state.code });
      this.animateSuccess();
    }
    this.showResultMessage(executionResult);
  }

  showExecutingMessage() {
    this.setState({
      executing: true,
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
      executing: false,
      messageVisible: true,
      message
    });
  }
  closeMessage() {
    this.setState({ messageVisible: false });
  }

  triggerSuccessEvent() {
    // noinspection JSUnresolvedVariable, JSClosureCompilerSyntax
    this.refs.componentNode.dispatchEvent(
      new Event('codesuccess', { bubbles: true })
    );
  }
  normalizeCodeBeforeAnimation() {
    const { text1: successCode, text2: finalCode } = normalizeTexts({
      text1: this.state.successCode, text2: finalCodeConst,
      cols: this.maxColumns
    });
    this.setState({ successCode, finalCode });
  }
  animateSuccess() {
    this.normalizeCodeBeforeAnimation();
    new CodeAnimation(this.updateCode.bind(this), this.state)
      .start()
      .then(this.triggerSuccessEvent.bind(this));
  }


  render() {
    const options = {
      mode: this.state.success ? 'text/plain' : 'javascript',
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
          ready={!this.state.executing}
          success={this.state.success}
          message={this.state.message}
        />
        <button onClick={this.submitCode.bind(this)}>Submit</button>
      </div>
    );
  }
}
