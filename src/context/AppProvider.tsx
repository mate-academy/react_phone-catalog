import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { ProductsProvider } from './ProductsContext';
//import { CartProvider } from './CartContext';
import { FavoritesProvider } from './FavoritesContext';
import { CartProvider } from './CartContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <CartProvider>
          <ProductsProvider>{children}</ProductsProvider>
        </CartProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
};
