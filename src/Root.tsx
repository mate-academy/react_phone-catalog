import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { App } from './App';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CategoryPage } from './modules/CategoryPage';
import { HomePage } from './modules/HomePage';
import { FavouritesPage } from './modules/FavouritesPage';
import { CartPage } from './modules/CartPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { FavouritesProvider } from './context/FavouritesContext';
import { CartProvider } from './context/CartContext';
import { ProductsProvider } from './context/ProductsContext';
import { LoadingProvider } from './context/LoadingContext';
import { ScrollToTop } from './modules/shared/components/ScrollToTop';

export const Root = () => (
  <React.StrictMode>
    <LoadingProvider>
      <ProductsProvider>
        <FavouritesProvider>
          <CartProvider>
            <Router>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<App />}>
                  <Route index element={<HomePage />} />

                  <Route path=":categoryName">
                    <Route index element={<CategoryPage />} />
                    <Route path=":productId" element={<ProductDetailsPage />} />
                  </Route>

                  <Route path="cart" element={<CartPage />} />
                  <Route path="favourites" element={<FavouritesPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Router>
          </CartProvider>
        </FavouritesProvider>
      </ProductsProvider>
    </LoadingProvider>
  </React.StrictMode>
);
