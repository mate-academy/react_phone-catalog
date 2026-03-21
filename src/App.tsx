import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import './App.scss';

export const App: React.FC = () => (
  <BrowserRouter basename="/react_phone-catalog">
    <CartProvider>
      <FavoritesProvider>
        <div className="layout">
          <Header />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/phones" element={<PhonesPage />} />
              <Route
                path="/phones/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/tablets" element={<TabletsPage />} />
              <Route
                path="/tablets/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/accessories" element={<AccessoriesPage />} />
              <Route
                path="/accessories/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </FavoritesProvider>
    </CartProvider>
  </BrowserRouter>
);
