import Promise from 'es6-promise';
Promise.polyfill();

import React from 'react';
import ReactDOM from 'react-dom';
import AwesomeEditor from './AwesomeEditor';
import EmailBlock from './EmailBlock';
import './client.less';

// noinspection NodeModulesDependencies
const editorMountNode = document.getElementById('aeditor-root');
ReactDOM.render(<AwesomeEditor/>, editorMountNode);

// noinspection NodeModulesDependencies
const emailBlockMountNode = document.getElementById('email-block');
ReactDOM.render(<EmailBlock/>, emailBlockMountNode);
