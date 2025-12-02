import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Product } from '../../types';
import { STORAGE_KEYS } from '../constants';

export type CartItem = {
  id: number;
  quantity: number;
  product: Product;
};

export type Props = {
  children: React.ReactNode;
};

type CartContextType = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
});

export const CartProvider: React.FC<Props> = ({ children }) => {
  const saved = localStorage.getItem(STORAGE_KEYS.CART);
  const listOfCartItems = saved ? JSON.parse(saved) : [];

  const [cartItems, setCartItems] = useState<CartItem[]>(listOfCartItems);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
  }, [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      setCartItems,
    }),
    [cartItems, setCartItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
