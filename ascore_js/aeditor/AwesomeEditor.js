import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';

import Message from './Message';
import './AwesomeEditor.less';
import executeCode from './execute-code';

// Require without any module loading, nor executing
const initialCode = require('!!raw!./initial-code.js');

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
    this.showProcessMessage();
    setTimeout(() => {
      executeCode(this.state.code, this.showNewMessage.bind(this));
    }, 500);
  }
  showProcessMessage(){
    this.setState({
      ready: false,
      messageVisible: true,
      message: 'Processing...'
    });
  }
  showNewMessage(executionResult) {
    let message;
    if (executionResult.success) {
      message = 'Well done';
      this.triggerSuccessEvent();
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

  render() {
    const options = {
      mode: 'javascript',
      theme: 'dracula',

      lineNumbers: false,
      lineWrapping: true,

      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
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
