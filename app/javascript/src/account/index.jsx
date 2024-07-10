import React from 'react';
import Account from './account';
import * as ReactDOMClient from 'react-dom/client';

const root = ReactDOMClient.createRoot(document.body.appendChild(document.createElement('div')));
document.addEventListener('DOMContentLoaded', () => {
  root.render(<Account />);
});
