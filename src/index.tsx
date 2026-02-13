import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './utils/style/main.scss';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
