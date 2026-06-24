import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/Home/HomePage';
import { Layout } from '@/app/layout/Layout';
import { CatalogPage } from '@/pages/Catalog/CatalogPage';
import { ProductPage } from '@/pages/Product/ProductPage';
import Favorites from '@/pages/Favorites/Favorites';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import { RoutePaths } from './RoutePaths';
import { CartPage } from '@/pages/Cart/CartPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={RoutePaths.HOME} element={<HomePage />} />
        <Route path={RoutePaths.CATALOG} element={<CatalogPage />} />
        <Route path={RoutePaths.PRODUCT} element={<ProductPage />} />
        <Route path={RoutePaths.CART} element={<CartPage />} />
        <Route path={RoutePaths.FAVORITES} element={<Favorites />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
