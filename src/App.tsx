import { Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from './shared/components/ScrollToTop';

import { HomePage } from './modules/HomePage/HomePage';
import { CatalogPage } from './modules/CatalogPage';
import { Footer } from './shared/components/Footer';
import { Header } from './shared/components/Header/Header';
import { NotFoundPage } from './modules/NotFoundPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartPage } from './modules/CartPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';

import { ContactsPage } from './modules/ContactsPage';
import { RightsPage } from './modules/RightsPage';

import './App.scss';

export const App = () => {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  return (
    <div className="app">
      <ScrollToTop />
      <Header />

      <main className="main">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/:category" element={<CatalogPage />} />
          <Route
            path="/:category/:productId"
            element={<ProductDetailsPage />}
          />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/rights" element={<RightsPage />} />

          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};
