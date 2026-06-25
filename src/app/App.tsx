import './App.scss';
import { Router } from '../components/Router';
import { FavoritesProvider } from '../context';
import { ShoppingCartProvider } from '../context';

export const App = () => (
  <FavoritesProvider>
    <ShoppingCartProvider>
      <Router />
    </ShoppingCartProvider>
  </FavoritesProvider>
);
