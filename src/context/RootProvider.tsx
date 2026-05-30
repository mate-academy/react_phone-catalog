import { AppProvider } from './app/AppProvider';
import { CartProvider } from './cart/CartProvider';
import { FavoritesProvider } from './favorites/FavoritesProvider';
import { ProductsProvider } from './products/ProductsProvider';

export const RootProvider = ({ children }: { children: React.ReactNode }) => (
  <AppProvider>
    <ProductsProvider>
      <FavoritesProvider>
        <CartProvider>{children}</CartProvider>
      </FavoritesProvider>
    </ProductsProvider>
  </AppProvider>
);
