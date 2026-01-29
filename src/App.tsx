import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
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
import { CartProvider } from './context/CartContext';
import { FavProvider } from './context/FavContext';

export const App = () => {
  return (
    <CartProvider>
      <FavProvider>
        <HashRouter>
          <ScrollToTop />
          <div className="app-wrapper">
            <Header />
            <main className="section">
              <div className="container">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/phones" element={<PhonesPage />} />
                  <Route path="/tablets" element={<TabletsPage />} />
                  <Route path="/accessories" element={<AccessoriesPage />} />

                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/favourites" element={<FavouritesPage />} />

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

                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </div>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </FavProvider>
    </CartProvider>
  );
};
