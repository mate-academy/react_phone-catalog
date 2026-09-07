import React from 'react';

import { ThemeProvider } from './ThemeContext';
import { FavoritesProvider } from './FavoritesContext';
import { CartProvider } from './CartContext';

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <CartProvider>{children}</CartProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
};
