import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PhonesPage } from './pages/PhonesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { TabletsPage } from './pages/TabletsPage';
import { CartProvider } from './storage/cartContext';
import { FavouritesProvider } from './storage/favoriteContext';
import { ModalProvider } from './storage/modalContext';
import { NotificationProvider } from './storage/notificationContext';

export const Root: React.FC = () => (
  <NotificationProvider>
    <ModalProvider>
      <CartProvider>
        <FavouritesProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />

              <Route path="phones">
                <Route index element={<PhonesPage />} />
                <Route path=":productId" element={<ProductDetailsPage />} />
              </Route>

              <Route path="tablets">
                <Route index element={<TabletsPage />} />
              </Route>

              <Route path="accessories">
                <Route index element={<AccessoriesPage />} />
              </Route>

              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="cart" element={<CartPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </FavouritesProvider>
      </CartProvider>
    </ModalProvider>
  </NotificationProvider>
);
