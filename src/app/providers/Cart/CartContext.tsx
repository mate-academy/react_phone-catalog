import { useLocalStorage } from '@/shared/Hooks';
import { createContext, useContext, ReactNode } from 'react';

type CartContextType = {
  cart: string[];
  setCart: (value: string[] | ((prev: string[]) => string[])) => void;
};

const CartContext = createContext<CartContextType | null>(null);


export function CartProvider({ children }: {children: ReactNode}) {
  const [cart, setCart] = useLocalStorage<string[]>('cart', []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
}
