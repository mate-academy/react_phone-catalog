import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type Context = {
  cart: CartItemLocal[];
  setCart: (value: CartItemLocal[]) => void;
};

type CartItemLocal = {
  id: string;
  quantity: number;
};

export const CartContext = React.createContext<Context>({
  cart: [],
  setCart: () => {},
});

export const GlobalCartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useLocalStorage<CartItemLocal[]>('cart', []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
