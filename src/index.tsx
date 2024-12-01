/* eslint-disable react/react-in-jsx-scope */
import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { ProductsProvider } from './store/ProductsContext';
import { FavouritesProvider } from './store/FavouritesContex';
import { CartProvider } from './store/CartContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <CartProvider>
    <FavouritesProvider>
      <ProductsProvider>
        <Root />
      </ProductsProvider>
    </FavouritesProvider>
  </CartProvider>,
);
