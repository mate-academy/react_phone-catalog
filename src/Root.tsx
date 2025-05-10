import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './main.scss';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { NotFoundPage } from './pages/NotFoundPage';

/* import { CartProvider } from './context/CartProvider';
import { FavoritesProvider } from './context/FavoriteProvider';
<CartProvider>
  <FavoritesProvider>
  </FavoritesProvider>
</CartProvider>;
*/

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path=":category">
            <Route index element={<CatalogPage />} />
            <Route path=":itemId" element={<ProductPage />} />
          </Route>

          <Route path="favorites">
            <Route index element={<FavoritesPage />} />
            <Route path=":itemId" element={<ProductPage />} />
          </Route>

          <Route path="cart" element={<CartPage />} />

          <Route path=":itemId" element={<ProductPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
