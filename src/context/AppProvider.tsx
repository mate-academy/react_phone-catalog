// src/context/AppProviders.tsx
import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { ProductsProvider } from './ProductsContext';
//import { CartProvider } from './CartContext';
//import { FavoritesProvider } from './FavoritesContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider>
      <ProductsProvider>{children}</ProductsProvider>
    </ThemeProvider>
  );
};
