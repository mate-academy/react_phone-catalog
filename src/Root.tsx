import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { HomePage } from './pages/HomePage';
import { App } from './App';
import { FavoritesPage } from './pages/FavoritesPage';
import { BasketPage } from './pages/BasketPage';
import { ProductDetailPage } from './pages/ProductDetailPage/ProductDetailPage';

export const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="phones">
          <Route index element={<PhonesPage />} />
          <Route path=":productId" element={<ProductDetailPage />} />
        </Route>
        <Route path="tablets">
          <Route index element={<TabletsPage />} />
          <Route path=":productId" element={<ProductDetailPage />} />
        </Route>
        <Route path="accessories">
          <Route index element={<AccessoriesPage />} />
          <Route path=":productId" element={<ProductDetailPage />} />
        </Route>
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="basket" element={<BasketPage />} />
      </Route>
    </Routes>
  </Router>
);
