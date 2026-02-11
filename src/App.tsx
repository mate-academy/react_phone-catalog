/* eslint-disable max-len */

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Layout } from './components/Layout';
import { CartProvider } from './modules/shared/context/CartContext';
import { FavoritesProvider } from './modules/shared/context/FavoritesContext';
import { NotificationProvider } from './modules/shared/context/NotificationContext';
import { SearchProvider } from './modules/shared/context/SearchContext';
import { CartPage } from './modules/CartPage/CartPage';
import { CatalogPage } from './modules/CatalogPage/CatalogPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { HomePage } from './modules/HomePage/HomePage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import './App.scss';

export const App = () => (
  <BrowserRouter>
    <NotificationProvider>
      <CartProvider>
        <FavoritesProvider>
          <SearchProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/phones"
                  element={
                    <CatalogPage category="phones" title="Phones page" />
                  }
                />
                <Route
                  path="/tablets"
                  element={
                    <CatalogPage category="tablets" title="Tablets page" />
                  }
                />
                <Route
                  path="/accessories"
                  element={
                    <CatalogPage
                      category="accessories"
                      title="Accessories page"
                    />
                  }
                />
                <Route
                  path="/product/:productId"
                  element={<ProductDetailsPage />}
                />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          </SearchProvider>
        </FavoritesProvider>
      </CartProvider>
    </NotificationProvider>
  </BrowserRouter>
);
