import './App.scss';
import { AppRouter } from './AppRouter';
import { FavoritesProvider } from './contexts/FavoritesContext';

export const App = () => (
  <FavoritesProvider>
    <AppRouter />
  </FavoritesProvider>
);
