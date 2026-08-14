import { createRoot } from 'react-dom/client';
import { App } from './App';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import './styles/global.scss';
import { FavoritesProvider } from './modules/FavoritesPage/FavoritesContext';
import { CartProvider } from './modules/CartPage/CartContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <FavoritesProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FavoritesProvider>
  </HashRouter>,
);
