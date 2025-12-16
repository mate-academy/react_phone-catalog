import { createRoot } from 'react-dom/client';
import React from 'react';
import 'bulma/css/bulma.css';
import { Root } from './Root';
import { FavoritesProvider } from './components/FavoritesContext';
import { CartProvider } from './context/CartContext';
createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CartProvider>
      <FavoritesProvider>
        <Root />
      </FavoritesProvider>
    </CartProvider>
  </React.StrictMode>,
);
