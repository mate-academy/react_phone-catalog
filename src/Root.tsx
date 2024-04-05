import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CatalogProvider } from './components/CatalogContext';
import { FavoritesPage } from './pages/FavoritesPage';
import { PageNotFound } from './pages/PageNotFound';

export const Root = () => {
  return (
    <CatalogProvider>
      <Router>
        <Routes>
          <Route element={<App />}>
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route index element={<HomePage />} />
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
            <Route path="cart" element={<CartPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </CatalogProvider>
  );
};
