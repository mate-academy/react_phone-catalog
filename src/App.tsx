import './App.scss';
import { AppRouter } from './AppRouter';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { CartProvider } from './contexts/CartContext';

export const App = () => (
  <CartProvider>
    <FavoritesProvider>
      <AppRouter />
    </FavoritesProvider>
  </CartProvider>
);
