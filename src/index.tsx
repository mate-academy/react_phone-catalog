import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { ShopProvider } from './shared/context/ShopContext';
import './styles/global.scss';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <ShopProvider>
        <App />
      </ShopProvider>
    </HashRouter>
  </React.StrictMode>,
);
