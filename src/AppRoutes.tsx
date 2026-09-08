import React from 'react';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { GlobalProvider } from './components/context/GlobalContext';
import { App } from './App';
import { HomePage } from './components/pages/HomePage';
import { ProductsPage } from './components/pages/ProductsPage';
import { ProductDetailsPage } from './components/pages/ProductDetailsPage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { FavoritesPage } from './components/pages/FavoritesPage';
import { ShoppingCartPage } from './components/pages/ShoppingCartPage';

export const AppRoutes: React.FC = () => {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="phones">
              <Route index element={<ProductsPage category="phones" />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>
            <Route path="tablets">
              <Route index element={<ProductsPage category="tablets" />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>
            <Route path="accessories">
              <Route index element={<ProductsPage category="accessories" />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="cart" element={<ShoppingCartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </GlobalProvider>
  );
};
