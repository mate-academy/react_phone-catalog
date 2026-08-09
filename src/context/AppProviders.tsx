import { ReactNode } from 'react';
import { FavoritesProvider } from './FavoritesContext';
import { CartProvider } from './CartContext';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <FavoritesProvider>
      <CartProvider>{children}</CartProvider>
    </FavoritesProvider>
  );
}
