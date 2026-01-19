import { BurgerMenuProvider } from './BurgerMenuContext';
import { CartProvider } from './CartContext';
import { FavoritesProvider } from './FavoritesContext';
import { ThemeProvider } from './ThemeContext';

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <BurgerMenuProvider>
        <CartProvider>
          <FavoritesProvider>{children}</FavoritesProvider>
        </CartProvider>
      </BurgerMenuProvider>
    </ThemeProvider>
  );
};
