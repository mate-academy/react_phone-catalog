import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../modules/shared/templates/MainLayout/MainLayout';
import { CatalogPage } from '../modules/CatalogPage';
import { HomePage } from '../modules/HomePage';
import { FavouritesPage } from '../modules/FavouritesPage';
import { CartPage } from '../modules/CartPage';
import { NotFoundPage } from '../modules/NotFoundPage';
import { ProductPage } from '../modules/ProductPage';

export const Router: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/phones" element={<CatalogPage category="phones" />} />
        <Route path="/tablets" element={<CatalogPage category="tablets" />} />
        <Route
          path="/accessories"
          element={<CatalogPage category="accessories" />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </HashRouter>
);
