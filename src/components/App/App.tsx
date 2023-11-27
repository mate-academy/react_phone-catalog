import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Navbar } from '@components/Navbar';
import { Footer } from '@components/Footer';
import { FullPageLoader } from '@components/FullPageLoader';
import {
  CartProvider,
  ProductsProvider,
  FavoritesProvider,
} from '@contexts/index';
import './App.scss';

const HomePage = lazy(() => import('@routes/HomePage/HomePage'));
const ProductDetailsPage = lazy(
  () => import('@routes/ProductDetailsPage/ProductDetailsPage'),
);
const CartPage = lazy(() => import('@routes/CartPage/CartPage'));
const FavoritesPage = lazy(() => import('@routes/FavoritesPage/FavoritesPage'));
const ProductPage = lazy(() => import('@routes/ProductPage/ProductPage'));
const NotFoundPage = lazy(() => import('@routes/NotFoundPage/NotFoundPage'));

export const App = () => (
  <div className="app">
    <FavoritesProvider>
      <CartProvider>
        <header className="app__header">
          <Navbar />
        </header>
        <ProductsProvider>
          <main className="app__main">
            <Suspense fallback={<FullPageLoader />}>
              <Routes>
                <Route index element={<Navigate to="home" replace />} />
                <Route path="home" element={<HomePage />} />
                <Route path="phones">
                  <Route index element={<ProductPage category="phones" />} />
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>
                <Route path="tablets">
                  <Route index element={<ProductPage category="tablets" />} />
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>
                <Route path="accessories">
                  <Route
                    index
                    element={<ProductPage category="accessories" />}
                  />
                  <Route path=":productId" element={<ProductDetailsPage />} />
                </Route>
                <Route path="cart" element={<CartPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route
                  path="*"
                  element={<NotFoundPage title="Page not found" />}
                />
              </Routes>
            </Suspense>
          </main>
        </ProductsProvider>
        <Footer />
      </CartProvider>
    </FavoritesProvider>
  </div>
);
