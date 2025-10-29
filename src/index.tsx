import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/index.scss';
import React from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { CatalogPage } from './modules/CatalogPage';
import { ProductsType } from './types/ProductsType';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartPage } from './modules/CartPage';
import { NotFoundPage } from './modules/NotFoundPage';

const categories = [
  ProductsType.Phones,
  ProductsType.Tablets,
  ProductsType.Accessories,
];

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        {categories.map(category => (
          <Route key={category} path={category}>
            <Route index element={<CatalogPage category={category} />} />
            <Route
              path=":productId"
              element={<ProductDetailsPage category={category} />}
            />
          </Route>
        ))}

        <Route path={'favorites'}>
          <Route index element={<FavoritesPage />} />
        </Route>

        <Route path={'cart'}>
          <Route index element={<CartPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>

  </Router>,
);
