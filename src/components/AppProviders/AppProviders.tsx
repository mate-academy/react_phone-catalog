import { PropsWithChildren } from 'react';
import {
  CartProvider,
  FavoritesProvider,
  ThemeProvider,
} from '../../modules/shared/context';

export const AppProviders = ({ children }: PropsWithChildren) => (
  <ThemeProvider>
    <FavoritesProvider>
      <CartProvider>{children}</CartProvider>
    </FavoritesProvider>
  </ThemeProvider>
);
