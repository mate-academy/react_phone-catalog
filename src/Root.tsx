import React from 'react';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import { App } from './App';
import {
  HomePage,
  NotFoundPage,
  ProductsPage,
  FavoritesPage,
  CartPage,
  ProductDetailsPage,
} from './modules';
import { GlobalProvider } from './context';
import { Category } from './types';

export const Root = () => {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />

            <Route
              path="phones"
              element={<ProductsPage productsCategory={Category.Phones} />}
            />
            <Route
              path="tablets"
              element={<ProductsPage productsCategory={Category.Tablets} />}
            />
            <Route
              path="accessories"
              element={<ProductsPage productsCategory={Category.Accessories} />}
            />

            <Route
              path="phones/:productId"
              element={
                <ProductDetailsPage productsCategory={Category.Phones} />
              }
            />
            <Route
              path="tablets/:productId"
              element={
                <ProductDetailsPage productsCategory={Category.Tablets} />
              }
            />
            <Route
              path="accessories/:productId"
              element={
                <ProductDetailsPage productsCategory={Category.Accessories} />
              }
            />

            <Route path="cart" element={<CartPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </GlobalProvider>
  );
};
