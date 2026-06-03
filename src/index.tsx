import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import React from 'react';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <CartProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </CartProvider>
  </HashRouter>,
);
