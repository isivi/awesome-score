import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import initialCode from './initial-code';
import 'codemirror/mode/javascript/javascript';

// Theme
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';

// Folding
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/brace-fold';


export default class App extends Component {
  static propTypes = {};
  state = {
    code: initialCode
  };
  updateCode(newCode) {
    this.setState({
      code: newCode
    });
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
      <CodeMirror
        value={this.state.code}
        onChange={this.updateCode.bind(this)}
        options={options}
      />
    );
  }
}
