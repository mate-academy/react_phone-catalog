import './App.scss';

import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

import { AppRoutes } from './router/AppRoutes';

export const App = () => {
  return (
    <FavoritesProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </FavoritesProvider>
  );
};
