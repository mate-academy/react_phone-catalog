import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/fonts/variables.scss';
import './index.scss';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { CartProvider } from './contexts/CartContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <FavoritesProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FavoritesProvider>
    </HashRouter>
  </React.StrictMode>,
);
