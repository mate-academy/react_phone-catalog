import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { ProductsProvider } from './context/ProductsContext';
import { CartFavoriteProvider } from './context/CartFavoriteContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ProductsProvider>
    <CartFavoriteProvider>
      <Root />
    </CartFavoriteProvider>
  </ProductsProvider>,
);
