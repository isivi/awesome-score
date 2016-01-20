import { transform as babelTransform } from 'babel-standalone';

const testCases = [0, 1 ,2];

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
  callbacks[eventBody.callbackID](eventBody);
}
window.addEventListener('message', receiveMessage.bind(this), false);


export default function executeCode(codeRaw, callback) {
  let codeES5;
  try {
    codeES5 = babelTransform(codeRaw, { presets: ['es2015'] }).code;
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
      ${codeES5}
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

  //for(let testCase in testCases) {
  //}
}

