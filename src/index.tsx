import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
import { CartProvider } from './Context/CartContext';
import { FavoritesProvider } from './Context/FavoritesContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <CartProvider>
    <FavoritesProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </FavoritesProvider>
  </CartProvider>,
);
