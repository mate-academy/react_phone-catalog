import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import './styles/globals.scss';

import { FavoritesProvider } from './shared/context/FavoritesContext';
import { CartProvider } from './shared/context/CartContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <FavoritesProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </FavoritesProvider>
  </StrictMode>,
);
