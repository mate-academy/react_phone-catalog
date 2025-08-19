// src/app/AppRoutes.tsx

import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../modules/HomePage/HomePage';
import { PhonesPage } from '../modules/PhonesPage/PhonesPage';
import { TabletsPage } from '../modules/TabletsPage/TabletsPage';
import { AccessoriesPage } from '../modules/AccessoriesPage/AccessoriesPage';
import { FavoritesPage } from '../modules/FavoritesPage/FavoritesPage';
import { CartPage } from '../modules/CartPage/CartPage';
import { ProductDetailsPage } from '../modules/ProductDetailsPage';
import { NotFoundPage } from '../modules/NotFoundPage/NotFoundPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route path="/phones" element={<PhonesPage />} />
      <Route path="/tablets" element={<TabletsPage />} />
      <Route path="/accessories" element={<AccessoriesPage />} />

      <Route path="/product/:productId" element={<ProductDetailsPage />} />

      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/cart" element={<CartPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
