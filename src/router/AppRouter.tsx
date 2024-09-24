import { Navigate, Route, Routes } from 'react-router-dom';
import {
  HOME,
  PHONES,
  TABLETS,
  ACCESSORIES,
  FAVORITES,
  PRODUCT_ID,
  CART,
  ALL,
} from '../utils/routes';
import { App } from '../App';
import { HomePage } from '../modules/HomePage/HomePage';
import { FavoritesPage } from '../modules/FavoritesPage';
import { AccessoriesPage } from '../modules/AccessoriesPage';
import { TabletsPage } from '../modules/TabletsPage';
import { ProductDetailsPage } from '../modules/ProductDetailsPage';
import { NotFoundPage } from '../modules/NotFoundPage';
import { PhonesPage } from '../modules/PhonesPage';
import { CartPage } from '../modules/CartPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={HOME} element={<App />}>
        <Route index element={<HomePage />} />
        <Route path={HOME} element={<Navigate to={HOME} replace />} />
        <Route path={PHONES} element={<PhonesPage />} />
        <Route path={TABLETS} element={<TabletsPage />} />
        <Route path={ACCESSORIES} element={<AccessoriesPage />} />
        <Route path={FAVORITES} element={<FavoritesPage />} />
        <Route path={CART} element={<CartPage />} />
        <Route path={PRODUCT_ID} element={<ProductDetailsPage />} />
        <Route path={ALL} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
