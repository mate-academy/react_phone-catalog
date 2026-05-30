import React from 'react';
import { FavoritesProvider } from './context/FavoriteContext';
import { CartProvider } from './context/CartContext';
import { CategoriesProvider } from './context/CategoriesContext';
import { NotificationProvider } from './context/NotificationContext';
import { LoadingProvider } from './context/LoadingContext';

type Props = {
  children: React.ReactNode;
};

export const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <NotificationProvider>
      <LoadingProvider>
        <CategoriesProvider>
          <FavoritesProvider>
            <CartProvider>{children}</CartProvider>
          </FavoritesProvider>
        </CategoriesProvider>
      </LoadingProvider>
    </NotificationProvider>
  );
};
