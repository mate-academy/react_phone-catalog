/* eslint-disable prettier/prettier */
import { Route, Routes } from 'react-router-dom';

import { Layout } from '../components/Layout';
import { AccessoriesPage } from '../modules/AccessoriesPage';
import { CartPage } from '../modules/CartPage';
import { FavoritesPage } from '../modules/FavoritesPage';
import { HomePage } from '../modules/HomePage';
import { NotFoundPage } from '../modules/NotFoundPage';
import { PhonesPage } from '../modules/PhonesPage';
import { ProductDetailsPage } from '../modules/ProductDetailsPage';
import { TabletsPage } from '../modules/TabletsPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/tablets" element={<TabletsPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />

        <Route path="/:category/:productId" element={<ProductDetailsPage />} />

        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
