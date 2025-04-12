import React from 'react';
import App from './components/App';

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);