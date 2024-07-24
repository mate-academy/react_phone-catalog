import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage/HomePage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { FavouritesPage } from './modules/FavouritesPage/FavouritesPage';
import { CartPage } from './modules/CartPage';
import { FavouriteProductsProvider } from './store/FavouriteProductsContext';

export const Root = () => {
  return (
    <Router>
      <FavouriteProductsProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </FavouriteProductsProvider>
    </Router>
  );
};
