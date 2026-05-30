import { CartProvider } from './cart-context/CartContext';
import { FavoriteProvider } from './favorites-context/FavoritesContext';
import { HomePage } from './modules/home';
import './styles/App.module.scss';

export const App = () => (
  <FavoriteProvider>
    <CartProvider>
      <HomePage />
    </CartProvider>
  </FavoriteProvider>
);
