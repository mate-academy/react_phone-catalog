import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { CatalogPage } from './modules/CatalogPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

export const Root: React.FC = () => (
  <Router>
    <CartProvider>
      <FavoritesProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route
              path="phones"
              element={<CatalogPage category="phones" title="Mobile phones" />}
            />
            <Route
              path="tablets"
              element={<CatalogPage category="tablets" title="Tablets" />}
            />
            <Route
              path="accessories"
              element={
                <CatalogPage category="accessories" title="Accessories" />
              }
            />
            <Route path="product/:productId" element={<ProductDetailsPage />} />
            <Route path="phones/:productId" element={<ProductDetailsPage />} />
            <Route path="tablets/:productId" element={<ProductDetailsPage />} />
            <Route
              path="accessories/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="cart" element={<CartPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="not-found" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </FavoritesProvider>
    </CartProvider>
  </Router>
);
