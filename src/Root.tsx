import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { HomePage } from './modules/HomePage/HomePage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { App } from './App';
import { CartPage } from './modules/CatalogPage/CartPage/CartPage';
import { CatalogPage } from './modules/CatalogPage/CatalogPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { PhonesPage } from './modules/PhonesPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="phones" element={<PhonesPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="favourites" element={<FavoritesPage />} />
          <Route path="product/:productId" element={<ProductDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
