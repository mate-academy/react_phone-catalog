import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import App from './App';
import { HomePage } from './pagas/HomePage';
import { ErrorPage } from './pagas/ErrorPage';
import { PhonesPage } from './pagas/PhonesPage';
import { TabletsPage } from './pagas/TabletsPage';
import { AccessoriesPage } from './pagas/AccessoriesPage';
import { FavoritesPage } from './pagas/FavoritesPage';
import { CartPage } from './pagas/CartPage';
import { ProductDetailsPage }
  from './pagas/ProductDetailsPage/ProductDetailsPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route
              path=":productId"
              element={<ProductDetailsPage />}
            />
          </Route>
          <Route path="tablets">
            <Route index element={<TabletsPage />} />
            <Route
              path=":productId"
              element={<ProductDetailsPage />}
            />
          </Route>
          <Route path="accessories">
            <Route index element={<AccessoriesPage />} />
          </Route>
          <Route path="favourites">
            <Route index element={<FavoritesPage />} />
          </Route>
          <Route path="cart">
            <Route index element={<CartPage />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Route>

      </Routes>
    </Router>
  );
};
