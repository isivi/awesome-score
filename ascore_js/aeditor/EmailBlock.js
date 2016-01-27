import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Velocity from 'velocity-animate';

const djangoTemplateContext = window.djangoTemplateContext || {};


export default class EmailBlock extends Component {
  constructor() {
    super();
    this.handleCodeSuccessBound = this.handleCodeSuccess.bind(this);
  }
  state = {
    csrfToken: djangoTemplateContext.csrftoken,
    formSubmitUrl: djangoTemplateContext.formSubmitUrl,
    visible: false
  };
  componentDidMount() {
    window.addEventListener('codesuccess', this.handleCodeSuccessBound);
  }
  componentWillUnmount() {
    window.removeEventListener('codesuccess', this.handleCodeSuccessBound);
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
          <form action={this.state.formSubmitUrl} method="post">
            <input name="csrfmiddlewaretoken" value={this.state.csrfToken} type="hidden"/>
            <input id="id_email" name="email" placeholder="Wpisz adres email..." type="text"/>
            <button type="submit">PRZEŚLIJ</button>
          </form>
        </div>
        <div id="isivi-logo" style={displayStyle}></div>
      </div>
    );
  }
}
