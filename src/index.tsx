import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Root } from './Root.js';
import { CartProvider } from './CartContext.js';
import { FavouritesProvider } from './FavouritesContext.js';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FavouritesProvider>
      <CartProvider>
        <Root />
      </CartProvider>
    </FavouritesProvider>
  </StrictMode>,
);
