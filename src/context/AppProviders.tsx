import type React from 'react';
import { CartProvider } from './CartContext';
import { FavoritesProvider } from './FavoritesContext';

export const AppProviders: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <CartProvider>
    <FavoritesProvider>{children}</FavoritesProvider>
  </CartProvider>
);
