import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';

import './AwesomeEditor.less';
import executeCode from './execute-code';
import initialCode from './initial-code';

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
    code: initialCode
  };
  updateCode(newCode) {
    this.setState({
      code: newCode
    });
  }
  submitCode() {
    executeCode(this.state.code, this.showNewMessage.bind(this));
  }
  showNewMessage(messageData) {
    console.log(messageData);
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
      <div className="AwesomeEditor-component">
        <CodeMirror
          value={this.state.code}
          onChange={this.updateCode.bind(this)}
          options={options}
        />

        <button onClick={this.submitCode.bind(this)}>Submit</button>
      </div>
    );
  }
}
