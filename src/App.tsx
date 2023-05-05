import React from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CartProvider } from './helpers/cartHelper';
import { FavoritesProvider } from './helpers/favoritesHelper';
import { ProductsPage } from './pages/ProductsPage';
import { getAccessories, getPhones, getTablets } from './helpers/getProducts';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';

export const App: React.FC = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <div className="app">
          <Header />

          <main className="app__main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="home" element={<Navigate to="/" replace />} />

              <Route path="phones">
                <Route
                  index
                  element={(
                    <ProductsPage
                      getProductsOfType={getPhones}
                      pageTitle="Mobile phones"
                    />
                  )}
                />
                <Route path=":productId" element={<ProductDetailsPage />} />
              </Route>

              <Route path="tablets">
                <Route
                  index
                  element={(
                    <ProductsPage
                      getProductsOfType={getTablets}
                      pageTitle="Tablets"
                    />
                  )}
                />
                <Route path=":productId" element={<ProductDetailsPage />} />
              </Route>

              <Route path="accessories">
                <Route
                  index
                  element={(
                    <ProductsPage
                      getProductsOfType={getAccessories}
                      pageTitle="Accessories"
                    />
                  )}
                />
                <Route path=":productId" element={<ProductDetailsPage />} />
              </Route>

              <Route path="/cart" element={<CartPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </FavoritesProvider>
    </CartProvider>
  );
};
