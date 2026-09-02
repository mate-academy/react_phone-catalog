import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';

import { HomePage } from './modules/HomePage';
import { ProductsPage } from './modules/ProductsPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';

import styles from './App.module.scss';

export const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/phones" element={<ProductsPage />} />
          <Route path="/tablets" element={<ProductsPage />} />
          <Route path="/accessories" element={<ProductsPage />} />

          <Route path="/product/:productId" element={<ProductDetailsPage />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};
