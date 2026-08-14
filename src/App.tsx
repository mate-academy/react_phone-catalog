import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './shared/components/Layout/Layout';
import { HomePage } from './modules/HomePage';
import { CatalogPage } from './modules/CatalogPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { RightsPage } from './modules/RightsPage';
import { Toaster } from 'react-hot-toast';
import './styles/Toast.scss';

export const App = () => {
  return (
    <>
      <Toaster
        position="bottom-right"
        containerStyle={{ bottom: 32 }}
        toastOptions={{
          className: 'custom-toast',
          duration: 2500,
        }}
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="phones" element={<CatalogPage />} />
          <Route path="tablets" element={<CatalogPage />} />
          <Route path="accessories" element={<CatalogPage />} />
          <Route path="product/:productId" element={<ProductDetailsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="rights" element={<RightsPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};
