import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage/HomePage';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { CartPage } from './pages/CartPage/CartPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

export const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/phones"
            element={<CatalogPage category="phones" title="Mobile phones" />}
          />
          <Route
            path="/tablets"
            element={<CatalogPage category="tablets" title="Tablets" />}
          />
          <Route
            path="/accessories"
            element={<CatalogPage category="accessories" title="Accessories" />}
          />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/:category/:itemId" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
};
