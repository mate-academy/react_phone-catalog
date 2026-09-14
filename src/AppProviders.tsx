import { FavoritesProvider } from './context/FavoritesContext';
import { OrdersProvider } from './context/OrdersContext';
import { ProductsProvider } from './context/ProductsContext';

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <ProductsProvider>
    <FavoritesProvider>
      <OrdersProvider>{children}</OrdersProvider>
    </FavoritesProvider>
  </ProductsProvider>
);
