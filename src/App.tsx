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
import { CartProvider } from './modules/shared/context/CartContext';
import { FavoritesProvider } from './modules/shared/context/FavoritesContext';
import { LanguageProvider } from './modules/shared/context/LanguageContext';
import './App.scss';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <CartProvider>
        <FavoritesProvider>
          <div
            className="App"
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Header />

            <main style={{ flex: 1 }}>
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
    </LanguageProvider>
  );
};
