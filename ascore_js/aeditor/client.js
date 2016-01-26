import Promise from 'es6-promise';
Promise.polyfill();

import React from 'react';
import ReactDOM from 'react-dom';
import AwesomeEditor from './AwesomeEditor';
import './client.less';

// noinspection NodeModulesDependencies
const mountNode = document.getElementById('aeditor-root');
ReactDOM.render(<AwesomeEditor/>, mountNode);
