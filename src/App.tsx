import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './modules/HomePage';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartPage } from './modules/CartPage';
import { CatalogPage } from './modules/CatalogPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { NotFoundPage } from './modules/NotFoundPage';
import './App.scss';
import React from 'react';

export const App = () => {
  return (
    <div className="app" id="top">
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/phones"
            element={<CatalogPage category="phones" title="Mobile phones" />}
          />
          <Route path="/phones/:productId" element={<ProductDetailsPage />} />
          <Route
            path="/tablets"
            element={<CatalogPage category="tablets" title="Tablets" />}
          />
          <Route path="/tablets/:productId" element={<ProductDetailsPage />} />
          <Route
            path="/accessories"
            element={<CatalogPage category="accessories" title="Accessories" />}
          />
          <Route
            path="/accessories/:productId"
            element={<ProductDetailsPage />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};
