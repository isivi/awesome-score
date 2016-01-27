import React, { Component } from 'react';


const djangoTemplateContext = window.djangoTemplateContext || {};


export default class EmailBlock extends Component {
  state = {
    csrfToken: djangoTemplateContext.csrftoken,
    formSubmitUrl: djangoTemplateContext.formSubmitUrl
  };

  render() {
    return (
      <div className="EmailBlock-component">
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
    );
  }
}
