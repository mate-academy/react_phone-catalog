import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { ProductsProvider } from './context/ProductContexts';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ProductCategoryProvider } from './context/ProductCategoryProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <FavoritesProvider>
    <ProductsProvider>
      <CartProvider>
        <ProductCategoryProvider>
          <Root />
        </ProductCategoryProvider>
      </CartProvider>
    </ProductsProvider>
  </FavoritesProvider>,
);
