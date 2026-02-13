import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductPage } from './modules/ProductPage';
import { FavouritesPage } from './modules/FavouritesPage/FavouritesPage';
import { SelectedItemsPage } from './modules/SelectedItemsPage';
import { PageNotFound } from './modules/PageNotFound';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="phones" element={<PhonesPage />} />
          <Route
            path="phones/:productId"
            element={<ProductPage productCategory="phones" />}
          />
          <Route path="tablets" element={<TabletsPage />} />
          <Route
            path="tablets/:productId"
            element={<ProductPage productCategory="tablets" />}
          />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route
            path="accessories/:productId"
            element={<ProductPage productCategory="accessories" />}
          />
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<SelectedItemsPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};
