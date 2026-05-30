import { createRoot } from 'react-dom/client';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
import { CartProvider } from './modules/shared/contexts/CartContext';
// eslint-disable-next-line max-len
import { FavouritesProvider } from './modules/shared/contexts/FavouritesContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <CartProvider>
        <FavouritesProvider>
          <App />
        </FavouritesProvider>
      </CartProvider>
    </HashRouter>
  </React.StrictMode>,
);
