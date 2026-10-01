import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { ShopProvider } from './shared/context/ShopContext';

import './styles/global.scss';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ShopProvider>
      <App />
    </ShopProvider>
  </React.StrictMode>,
);
