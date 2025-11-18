import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { CategoryPage } from './modules/CategoryPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavoritePage } from './modules/FavoritePage/FavoritePage';
import { NotFound } from './components/NotFound';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/category/:type" element={<CategoryPage />} />
      <Route path="/product/:productId" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/favorites" element={<FavoritePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
