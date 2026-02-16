import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage/HomePage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import React from 'react';
import { CartProvider } from './contexts/CartContext';
import { CatalogPage } from './modules/CatalogPage/CatalogPage';
import { FavouritesPage } from './modules/FavouritesPage/FavouritesPage';
import { Cart } from './modules/CartPage/CartPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { ProductsProvider } from './contexts/ProductsContext';

export const Root = () => {
  return (
    <HashRouter>
      <ProductsProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="home" element={<Navigate to="/" replace />} />

              <Route path=":category">
                <Route index element={<CatalogPage />} />
                <Route path=":productId" element={<ProductDetailsPage />} />
              </Route>

              <Route path="favourites" element={<FavouritesPage />} />
              <Route path="cart" element={<Cart />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </CartProvider>
      </ProductsProvider>
    </HashRouter>
  );
};
