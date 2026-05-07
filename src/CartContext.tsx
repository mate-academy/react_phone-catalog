import React, { useCallback, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Cart } from './types/Cart';

type CartContextType = {
  cart: Cart[];
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
};

export const CartContext = React.createContext<CartContextType>({
  cart: [],
  setCart: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, saveCart] = useLocalStorage<Cart[]>('cart', []);

  const setCart: React.Dispatch<React.SetStateAction<Cart[]>> = useCallback(
    value => {
      if (typeof value === 'function') {
        saveCart(value(cart));
      } else {
        saveCart(value);
      }
    },
    [cart, saveCart],
  );

  const value = useMemo(() => ({ cart, setCart }), [cart, setCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
