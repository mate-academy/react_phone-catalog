import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import { HomePage } from './modules/HomePage';
import { ProductsListPage } from './modules/ProductListPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import './App.scss';
// import { CartPage } from './modules/CartPage';
// import { FavoritesPage } from './modules/FavoritesPage';
// import { NotFoundPage } from './modules/NotFoundPage';

export const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/*Products Pages*/}
          <Route path="/:category" element={<ProductsListPage />} />

          {/* Products Details Page*/}
          <Route
            path="/:category/:productId"
            element={<ProductDetailsPage />}
          />

          {/* Корзина и избранные */}
          {/* <Route path="/cart" element={<CartPage />} /> */}
          {/* <Route path="/favorites" element={<FavoritesPage />} /> */}

          {/* 404 */}
          {/* <Route path="*" element={<NotFoundPage />} />  */}
        </Routes>
      </Layout>
    </Router>
  );
};
