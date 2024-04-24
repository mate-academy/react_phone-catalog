import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { App } from './App';
import StoreProdiver from './store/Store';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import HomePage from './pages/HomePage/HomePage';
import PhonePage from './pages/PhonePage/PhonePage';
import TabletsPage from './pages/TabletsPage/TabletsPage';
import AccessoriesPage from './pages/AccessoriesPage/AccessoriesPage';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';
import FavouritesPage from './pages/FavouritesPage/FavouritesPage';
import CartPage from './pages/CartPage/CartPage';

const Root: React.FC = () => (
  <HashRouter>
    <StoreProdiver>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" />} />
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route path="phones" element={<PhonePage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </StoreProdiver>
  </HashRouter>
);

export default Root;
