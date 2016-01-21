import { transform as babelTransform } from 'babel-standalone';

// Process module normally but then return it raw, not executed
const testsCodeRawES5 = require('raw!./tests-code.js');


// TODO(TG): those vars and funcs matches best to be packed into a class

const iframe = document.createElement('iframe');
iframe.sandbox = ['allow-scripts'];
iframe.style.display = 'none';
document.body.appendChild(iframe);

let callbacksNum = 0;
const callbacks = {};

function receiveMessage(event) {
  const eventData = event.data;

  if (eventData.name !== 'codeExecuted') {
    return;
  }

  const eventBody = eventData.body;
  (callbacks[eventBody.callbackID] || (() => {}))(eventBody);
}
window.addEventListener('message', receiveMessage.bind(this), false);


export default function executeCode(codeRaw, callback) {
  let codeRawES5;
  try {
    codeRawES5 = babelTransform(codeRaw, { presets: ['es2015'] }).code;
  } catch (err) {
    return callback({
      success: false,
      errorMessage: err.message,
      errorName: err.name });
  }
  callbacks[++callbacksNum] = callback;

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
        errorMessage: caughtError ? caughtError.message : null,
        callbackID: ${callbacksNum}
      }
    }, '*')
  `;

  iframe.srcdoc = `<script type="text/javascript">${wrappedCode}</script>`;

}

