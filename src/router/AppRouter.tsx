import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RouterValidator } from './RouterValidator';
import { MainLayout } from '../components/Layout/MainLayout';
import { HomePage } from '../modules/HomePage';
import { ProductsPage } from '../modules/ProductsPage';
import { FavouritesPage } from '../modules/FavoritesPage';
import { CartPage } from '../modules/CartPage';
import { ProductDetailsPage } from '../modules/ProductDetailsPage';
import { NotFoundPage } from '../modules/NotFoundPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<RouterValidator />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="phones" element={<ProductsPage />} />
          <Route path="tablets" element={<ProductsPage />} />
          <Route path="accessories" element={<ProductsPage />} />
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="product/:productId" element={<ProductDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
