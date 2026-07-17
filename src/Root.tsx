import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import React from 'react';
import { HomePage } from './modules/HomePage';
import { PageNotFound } from './modules/PageNotFound';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { Favourites } from './modules/Favorites';

export const Root: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="phones" element={<PhonesPage />} />
        <Route path="tablets" element={<TabletsPage />} />
        <Route path="accessories" element={<AccessoriesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="favorites" element={<Favourites />} />

        <Route path="product/:productId" element={<ProductDetailsPage />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </HashRouter>
);
