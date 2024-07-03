import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { ProductProvider } from './context/productContext';
import { FavouritesProvider } from './context/favouritesContext';
import { CartProvider } from './context/cartContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ProductProvider>
    <FavouritesProvider>
      <CartProvider>
        <Root />
      </CartProvider>
    </FavouritesProvider>
  </ProductProvider>,
);
