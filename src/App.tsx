import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { CartPage } from './pages/CartPage/CartPage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';

export const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-wrapper">
        <Header />
        <main className="section">
          <div className="container">
            <Routes>
              {/* Główna strona */}
              <Route path="/" element={<HomePage />} />

              {/* Produkty */}
              <Route path="/phones" element={<PhonesPage />} />
              <Route path="/tablets" element={<TabletsPage />} />
              <Route path="/accessories" element={<AccessoriesPage />} />

              {/* Koszyk i Ulubione */}
              <Route path="/cart" element={<CartPage />} />
              <Route path="/favourites" element={<FavouritesPage />} />

              {/* Szczegóły produktu */}
              <Route
                path="/phones/:productId"
                element={<ProductDetailsPage />}
              />
              <Route
                path="/tablets/:productId"
                element={<ProductDetailsPage />}
              />
              <Route
                path="/accessories/:productId"
                element={<ProductDetailsPage />}
              />

              {/* Strona błędu i przekierowanie z home */}
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
