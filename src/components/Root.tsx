import { HashRouter, Navigate } from 'react-router-dom';
import { App } from '../App';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { CartProvider, FavoritesProvider, SearchProvider, MenuProvider } from '../contexts';
import { HomePage } from '../modules/HomePage';
import { CartPage } from '../modules/CartPage/CartPage';
import { CategoryPage } from '../modules/CategoryPage/CategoryPage';
import { ProductDetailsPage } from '../modules/ProductDetailsPage/ProductDetailsPage';
import { FavouritesPage } from '../modules/FavouritesPage';
import { NotFoundPage } from '../modules/NotFoundPage';

export const Root: React.FC = () => (
  <HashRouter>
    <MenuProvider>
      <SearchProvider>
        <CartProvider>
          <FavoritesProvider>
            <Routes>
              <Route path="/" element={<App />}>
                {/* Головна сторінка */}
                <Route index element={<HomePage />} />
                <Route path="home" element={<Navigate to="/" replace />} />

                {/* Категорії — /category/notebooks */}
                <Route path="category/:category" element={<CategoryPage />} />

                {/* Продукт — /product/123 або /product/notebook-acer-123 */}
                <Route path="product/:product" element={<ProductDetailsPage />} />

                {/* Кошик та улюблені */}
                <Route path="cart" element={<CartPage />} />
                <Route path="favorites" element={<FavouritesPage />} />

                {/* 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>

          </FavoritesProvider>
        </CartProvider>
      </SearchProvider>
    </MenuProvider>
  </HashRouter>
);