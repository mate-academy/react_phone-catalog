import { HashRouter } from 'react-router-dom';
import { App } from '../App';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import {
  CartProvider,
  FavoritesProvider,
  SearchProvider,
  MenuProvider,
} from '../contexts';
import { HomePage } from '../modules/HomePage';
import { CartPage } from '../modules/CartPage/CartPage';
import { CategoryPage } from '../modules/CategoryPage/CategoryPage';
import { ProductDetailsPage } from '../modules/ProductDetailsPage';
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
                <Route index element={<HomePage />} />

                <Route path=":category" element={<CategoryPage />} />

                <Route
                  path=":category/:product"
                  element={<ProductDetailsPage />}
                />

                <Route path="/cart" element={<CartPage />} />
                <Route path="/favorites" element={<FavouritesPage />} />

                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </FavoritesProvider>
        </CartProvider>
      </SearchProvider>
    </MenuProvider>
  </HashRouter>
);
