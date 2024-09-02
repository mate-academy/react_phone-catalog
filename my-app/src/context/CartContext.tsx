import React, { useState, useCallback } from 'react';
import { CartItem } from '../types/types';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  cartItems: CartItem[] | null;
  updateCartItems: (values: CartItem[]) => void;
};

export const CartContext = React.createContext<ContextType>({
  cartItems: null,
  updateCartItems: () => {},
});

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);

  const updateCartItems = useCallback((data: CartItem[]) => {
    if (data) {
      setCartItems(data);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, updateCartItems }}>{children}</CartContext.Provider>
  );
};
