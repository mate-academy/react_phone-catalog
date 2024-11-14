// import './App.scss';
// src/App.tsx
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import './App.scss';
import styles from '../src/styles/layout.module.scss';
import { useRef } from 'react';
import PhonesPage from './modules/PhonesPage/PhonesPage';
import AccessoriesPage from './modules/AccessoriesPage/AccessoriesPage';
import TabletsPage from './modules/TabletsPage/TabletsPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { HomePage } from './modules/HomePage/HomePage';
import { CartProvider } from './context/CartContext/CartContext';
import { FavoritesProvider } from './context/FavoritesContext/FavoritesContext';
import { CartPage } from './modules/CartPage/CartPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { ThemeProvider } from './context/ThemeContext/ThemeContext';
import ProductsPage from './modules/ProductsPage/ProductsPage';

export const App: React.FC = () => {
  const topRef = useRef<HTMLDivElement | null>(null);
  return (
    <Router>
      <div className={styles.container}>
        <ThemeProvider>
          <FavoritesProvider>
            <CartProvider>
              <Header ref={topRef} />
              <main className="main">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/phones" element={<PhonesPage />} />
                  <Route path="/tablets" element={<TabletsPage />} />
                  <Route path="/accessories" element={<AccessoriesPage />} />
                  <Route
                    path="/product/:category/:itemId"
                    element={<ProductDetailsPage />}
                  />
                  <Route
                    path="/favourites"
                    element={<FavoritesPage />}
                  />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/search" element={<ProductsPage />} />
                  <Route path="*" element={<h1>Page not found</h1>} />
                </Routes>
              </main>
              <Footer topRef={topRef} />
            </CartProvider>
          </FavoritesProvider>
        </ThemeProvider>
      </div>
    </Router>
  );
};
