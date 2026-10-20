import type React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import { HomePage } from './modules/HomePage';
import { ProductPage } from './modules/ProductPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartPage } from './modules/CartPage';
import { AppProviders } from './context/AppProviders';
import { ProductDetailsPage } from './modules/ProductDetailsPage';

export const Root: React.FC = () => {
  return (
    <AppProviders>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path=":category" element={<ProductPage />}></Route>
            <Route path=":category/:id" element={<ProductDetailsPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
};
