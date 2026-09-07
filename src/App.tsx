// src/App.tsx - Main application component
import { Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

import { HomePage } from './modules/home/HomePage';
import { CatalogPage } from './modules/catalog/CatalogPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/product-details/ProductDetailsPage';
import { CartPage } from './modules/cart/CartPage';
import { FavoritesPage } from './modules/favorites/FavoritesPage';
import { NotFoundPage } from './modules/not-found/NotFoundPage';

import './styles/app.scss';
import './App.scss';

function Shell() {
  return (
    <div className="app-container">
      <Header />
      <main className="container">
        <h1 className="visually-hidden">Product Catalog</h1>
        <Suspense fallback={<div className="loader">Loading…</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <CartProvider>
        <Routes>
          <Route element={<Shell />}>
            <Route index element={<HomePage />} />
            <Route path="phones" element={<CatalogPage category="phones" />} />
            <Route
              path="tablets"
              element={<CatalogPage category="tablets" />}
            />
            <Route
              path="accessories"
              element={<CatalogPage category="accessories" />}
            />

            <Route path="product/:productId" element={<ProductDetailsPage />} />

            <Route path="cart" element={<CartPage />} />
            <Route path="favorites" element={<FavoritesPage />} />

            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </FavoritesProvider>
  );
};

export default App;
