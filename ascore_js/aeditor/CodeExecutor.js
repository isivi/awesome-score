import { transform as babelTransform } from 'babel-standalone';

// Process module normally but then return it raw, not executed
const testsCodeRawES5 = require('raw!./tests-code.js');


export default class CodeExecutor {
  constructor(codeRaw, callback) {
    this.createIFrame();
    this.createListener();
    this.executed = false;
    this.codeRaw = codeRaw;
    this.callback = callback;
  }

  createIFrame() {
    const iframe = this.iframe = document.createElement('iframe');
    iframe.sandbox = ['allow-scripts'];
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }

  createListener() {
    this.receivePostExecuteMessageBound = this.receivePostExecuteMessage.bind(this);
    window.addEventListener('message', this.receivePostExecuteMessageBound, false);
  }
  removeListener() {
    window.removeEventListener('message', this.receivePostExecuteMessageBound, false);
  }

  removeIFrame() {
    this.iframe.parentNode.removeChild(this.iframe);
  }

  execute() {
    let codeRawES5;
    try {
      codeRawES5 = babelTransform(this.codeRaw, { presets: ['es2015'] }).code;
    } catch (err) {
      return this.invokeCallback({
        success: false,
        errorMessage: err.message,
        errorName: err.name });
    }

    const wrappedCode = `
      var caughtError = null;
      try {
        ${codeRawES5}
        ${testsCodeRawES5}
      } catch(err) {
        caughtError = err;
      }

      window.parent.postMessage({
        name: 'codeExecuted',
        body: {
          success: !caughtError,
          errorName: caughtError ? caughtError.name : null,
          errorMessage: caughtError ? caughtError.message : null
        }
      }, '*')
    `;

    //setTimeout(this.timeoutCall.bind(this), 3000);
    this.iframe.srcdoc = `<script type="text/javascript">${wrappedCode}</script>`;
  }

  receivePostExecuteMessage(event) {
    const eventData = event.data;

    if (eventData.name !== 'codeExecuted') {
      return;
    }

    const eventBody = eventData.body;
    this.invokeCallback(eventBody);
  }

  invokeCallback(result) {
    if (this.executed) {
      return;
    }
    this.executed = true;
    try {
      this.callback(result);
    } finally {
      this.removeIFrame();
      this.removeListener();
    }
  }
  timeoutCall() {
    console.log('Timeout!');
    this.invokeCallback({
      success: false,
      errorMessage: 'Ups, it looks like infinite statement.',
      errorName: 'TimeoutError'
    })

  }

}
