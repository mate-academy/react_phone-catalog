import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './App.scss';

import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <FavoritesProvider>
          <HashRouter>
            <div className="App">
              <Header />

              <main className="main-content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/home" element={<Navigate to="/" replace />} />

                  <Route
                    path="/phones"
                    element={<ProductsPage category="phones" title="Phones" />}
                  />
                  <Route
                    path="/tablets"
                    element={
                      <ProductsPage category="tablets" title="Tablets" />
                    }
                  />
                  <Route
                    path="/accessories"
                    element={
                      <ProductsPage
                        category="accessories"
                        title="Accessories"
                      />
                    }
                  />

                  <Route
                    path="/product/:productId"
                    element={<ProductDetailsPage />}
                  />

                  <Route path="/cart" element={<CartPage />} />

                  <Route path="/favorites" element={<FavoritesPage />} />

                  <Route path="/not-found" element={<NotFoundPage />} />
                  <Route
                    path="*"
                    element={<Navigate to="/not-found" replace />}
                  />
                </Routes>
              </main>

              <Footer />
            </div>
          </HashRouter>
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
