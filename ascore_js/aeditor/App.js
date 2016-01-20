import React, { Component } from 'react';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';


export default class App extends Component {
  static propTypes = {};
  state = {
    code: '//write here your code'
  };
  updateCode(newCode) {
    this.setState({
      code: newCode
    });
  }
  render() {
    const options = {
      mode: 'javascript',
      theme: 'dracula'
    };
    return (
      <Codemirror
        value={this.state.code}
        onChange={this.updateCode.bind(this)}
        options={options}
      />
    );
  }
}
