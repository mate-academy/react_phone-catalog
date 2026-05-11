import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { App } from './App';
import { CartPage } from './modules/CartPage/CartPage';
import { CatalogPage } from './modules/CatalogPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="favourites" element={<FavoritesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path=":category">
            <Route index element={<CatalogPage />} />
            <Route path=":itemId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="product/:productId" element={<ProductDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
