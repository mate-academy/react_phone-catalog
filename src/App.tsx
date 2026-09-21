import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';
import { HomePage } from './modules/HomePage/HomePage';
import { ProductsPage } from './modules/ProductsPage/ProductsPage';
import { CartPage } from './modules/CartPage/CartPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import styles from './App.module.scss';

export const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <FavoritesProvider>
          <div className={styles.app}>
            <Header />
            <main className={styles.main}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route
                  path="/phones"
                  element={<ProductsPage category="phones" />}
                />
                <Route
                  path="/tablets"
                  element={<ProductsPage category="tablets" />}
                />
                <Route
                  path="/accessories"
                  element={<ProductsPage category="accessories" />}
                />
                <Route
                  path="/product/:productId"
                  element={<ProductDetailsPage />}
                />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </FavoritesProvider>
      </CartProvider>
    </Router>
  );
};
