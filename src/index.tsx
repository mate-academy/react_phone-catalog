import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

const redirect = new URLSearchParams(window.location.search).get('redirect');
const routerBaseName = new URL(import.meta.env.BASE_URL, window.location.origin)
  .pathname;

if (redirect) {
  window.history.replaceState(
    null,
    '',
    `${import.meta.env.BASE_URL}${redirect}`,
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename={routerBaseName}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
