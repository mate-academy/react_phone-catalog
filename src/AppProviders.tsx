import React from 'react';
import { FavoritesProvider } from './context/FavoriteContext';
import { CartProvider } from './context/CartContext';
import { CategoriesProvider } from './context/CategoriesContext';
import { ErrorProvider } from './context/ErrorContext';
import { LoadingProvider } from './context/LoadingContext';

type Props = {
  children: React.ReactNode;
};

export const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <ErrorProvider>
      <CategoriesProvider>
        <FavoritesProvider>
          <CartProvider>
            <LoadingProvider>{children}</LoadingProvider>
          </CartProvider>
        </FavoritesProvider>
      </CategoriesProvider>
    </ErrorProvider>
  );
};
