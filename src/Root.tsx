import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { App } from './App';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';
import { PhonesPage } from './modules/PhonesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { TabletsPage } from './modules/TabletsPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="phones">
          <Route index element={<PhonesPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>

        <Route path="tablets">
          <Route index element={<TabletsPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>

        <Route path="accessories">
          <Route index element={<AccessoriesPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>

        <Route path="favorites">
          <Route index element={<FavoritesPage />} />
        </Route>

        <Route path="cart">
          <Route index element={<CartPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
