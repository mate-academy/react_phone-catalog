import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { FavouritePage } from './pages/FavouritePage/FavouritePage';
import { CartPage } from './pages/CartPage/CartPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { ProductsProvider } from './store/ProductContext';
import { CartProvider } from './store/CartStore';
import { FavouriteProvider } from './store/FavouriteContext';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

export const Root: React.FC = () => (
  <CartProvider>
    <FavouriteProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route
            path="phones"
            element={
              <ProductsProvider>
                <PhonesPage />
              </ProductsProvider>
            }
          />

          <Route
            path="phones/:phoneId"
            element={
              <ProductsProvider>
                <PhonesPage />
              </ProductsProvider>
            }
          />

          <Route
            path="tablets"
            element={
              <ProductsProvider>
                <TabletsPage />
              </ProductsProvider>
            }
          />

          <Route
            path="tablets/:tabletId"
            element={
              <ProductsProvider>
                <TabletsPage />
              </ProductsProvider>
            }
          />

          <Route
            path="accessories"
            element={
              <ProductsProvider>
                <AccessoriesPage />
              </ProductsProvider>
            }
          />

          <Route
            path="accessories/:accessoryId"
            element={
              <ProductsProvider>
                <AccessoriesPage />
              </ProductsProvider>
            }
          />

          <Route
            path="product/:productId"
            element={
              <ProductsProvider>
                <ProductDetailsPage />
              </ProductsProvider>
            }
          />

          <Route path="favourites" element={<FavouritePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </FavouriteProvider>
  </CartProvider>
);
