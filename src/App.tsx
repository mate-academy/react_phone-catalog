import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';
import { HomePage } from './modules/HomePage';
import { ProductPage } from './modules/ProductPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { ShoppingCartPage } from './modules/ShoppingCartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';

export const App = () => (
  <div className="App">
    <Header />

    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phones" element={<ProductPage category="phones" />} />
        <Route path="/tablets" element={<ProductPage category="tablets" />} />
        <Route
          path="/accessories"
          element={<ProductPage category="accessories" />}
        />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>

    <Footer />
  </div>
);
