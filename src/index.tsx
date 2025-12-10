import React from 'react';
import ReactDOM from 'react-dom/client';
import { CartProvider } from './providers/CartProvider';
import { FavoritesProvider } from './providers/FavoritesProvider';
import { Root } from './Root';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <FavoritesProvider>
        <Root />
      </FavoritesProvider>
    </CartProvider>
  </React.StrictMode>,
);
