import { CartProvider } from './CartContext';
import { MenuProvider } from './MenuContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <MenuProvider>
    <CartProvider>{children}</CartProvider>
  </MenuProvider>
);
