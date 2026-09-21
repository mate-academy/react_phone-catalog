import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';

import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

import styles from './App.module.scss';

export const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <CartProvider>
        <div className={styles.app}>
          <Header />

          <main className={styles.main}>
            <Routes>
              {/* Главная страница */}
              <Route path="/" element={<HomePage />} />
              <Route path="home" element={<Navigate to="/" replace />} />

              {/* Страницы каталогов */}
              <Route path="phones" element={<PhonesPage />} />
              <Route path="tablets" element={<TabletsPage />} />
              <Route path="accessories" element={<AccessoriesPage />} />

              {/* Избранное и Корзина */}
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="cart" element={<CartPage />} />

              {/* Карточка товара */}
              <Route
                path=":category/:productId"
                element={<ProductDetailsPage />}
              />

              {/* 404 Страница */}
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </FavoritesProvider>
  );
};
