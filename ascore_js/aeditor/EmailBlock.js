import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Velocity from 'velocity-animate';
import keycode from 'keycode';
import queryString from 'query-string';

const djangoTemplateContext = window.djangoTemplateContext || {};


export default class EmailBlock extends Component {
  constructor() {
    super();
    this.handleCodeSuccessBound = this.handleCodeSuccess.bind(this);
  }
  state = {
    csrfToken: djangoTemplateContext.csrftoken,
    formSubmitUrl: djangoTemplateContext.formSubmitUrl,
    visible: false,
    email: ''
  };
  componentDidMount() {
    window.addEventListener('codesuccess', this.handleCodeSuccessBound);
  }
  componentWillUnmount() {
    window.removeEventListener('codesuccess', this.handleCodeSuccessBound);
  }
  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  onEmailKeyDown(event) {
    this.setState({ email: event.target.value });
    if (event.keyCode == keycode.codes.enter) {
      this.sendForm();
    }
  }
  handleCodeSuccess() {
    this.showUp();
    this.animateScroll();
  }
  showUp() {
    this.setState({ visible: true });
  }
  animateScroll() {
    // noinspection Eslint
    Velocity(ReactDOM.findDOMNode(this), 'scroll', 2000);
  }
  sendForm(event) {
    event.preventDefault();
    fetch(this.state.formSubmitUrl, {
      // Pass all credential data like cookie...
      credentials: 'same-origin',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRFToken': djangoTemplateContext.csrftoken || ''
      },
      body: queryString.stringify({ 'email': this.state.email })
    })
    .then(response => response.json());
  }

  render() {
    let displayStyle = { display: this.state.visible ? '' : 'none' };

    return (
      <div className="EmailBlock-component">
        <div id="congrats-block" style={displayStyle}>
            <div className="text1">To dopiero początek!</div>
            <div className="text2">
                Wcale nie musisz rezygnować z pensji,<br/>
                żeby zmieniać świat na co dzień.
            </div>
        </div>
        <div id="email-block" style={displayStyle}>
          <div className="email-text">
            <div className="text1">
              Napisz wiadomość na&nbsp;
              <a href="mailto:future@isivi.pl?Subject=Rewolucja%20z%20isivi" target="_top">
                future@isivi.pl
              </a><br/>
            </div>
            <div className="text2">
              lub po prostu zostaw swój e-mail, a my odezwiemy się do Ciebie!
            </div>
          </div>
          <form action={this.state.formSubmitUrl} method="post" id="email-form"
              onSubmit={this.sendForm.bind(this)}>
            <input name="csrfmiddlewaretoken" value={this.state.csrfToken} type="hidden"/>
            <input id="id_email" name="email" placeholder="Wpisz adres email..." type="text"
              onChange={this.onEmailChange.bind(this)}
              onKeyDown={this.onEmailKeyDown.bind(this)}/>
            <button type="submit">PRZEŚLIJ</button>
          </form>
        </div>
        <div id="isivi-logo" style={displayStyle}></div>
      </div>
    );
  }
}
