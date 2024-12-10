/* eslint-disable react/react-in-jsx-scope */
import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { ProductsProvider } from './store/ProductsContext';
import { FavouritesProvider } from './store/FavouritesContex';
import { CartProvider } from './store/CartContext';
import { ThemeProvider } from './store/ThemeContex';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider>
    <CartProvider>
      <FavouritesProvider>
        <ProductsProvider>
          <Root />
        </ProductsProvider>
      </FavouritesProvider>
    </CartProvider>
  </ThemeProvider>,
);
