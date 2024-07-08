import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home';
import * as ReactDOMClient from 'react-dom/client';

const root = ReactDOMClient.createRoot(document.body.appendChild(document.createElement('div')));
document.addEventListener('DOMContentLoaded', () => {
  root.render(<Home />);
});

