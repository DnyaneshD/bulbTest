import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app/app';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(React.createElement(App), document.getElementById('mount'));
});
