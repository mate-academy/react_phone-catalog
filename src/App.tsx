import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ThemeProvider } from './contexts/ThemeContext';

import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';

import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';

import { ROUTES } from './modules/shared/constants/routes';
import { ScrollToTop } from './components/ScrollToTop';

import './App.scss';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <FavoritesProvider>
          <Router>
            <div className="App">
              <Header />
              <ScrollToTop />

              <main className="App__main">
                <Routes>
                  <Route path={ROUTES.HOME} element={<HomePage />} />
                  <Route path={ROUTES.PHONES} element={<PhonesPage />} />
                  <Route path={ROUTES.TABLETS} element={<TabletsPage />} />
                  <Route
                    path={ROUTES.ACCESSORIES}
                    element={<AccessoriesPage />}
                  />
                  <Route
                    path={ROUTES.PRODUCT}
                    element={<ProductDetailsPage />}
                  />
                  <Route path={ROUTES.CART} element={<CartPage />} />
                  <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>

              <Footer />
            </div>
          </Router>
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  );
};
