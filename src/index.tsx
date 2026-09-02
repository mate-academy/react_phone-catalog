import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { CartProvider } from './modules/shared/context/CartContext';
import { FavoritesProvider } from './modules/shared/context/FavoritesContext';
import { App } from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HashRouter>
      <CartProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </CartProvider>
    </HashRouter>
  </React.StrictMode>,
);
