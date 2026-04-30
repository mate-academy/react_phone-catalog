import React, { createContext, ReactNode, useState } from 'react';
import { Product } from '../types';

type Props = {
  children: ReactNode;
};

type CartContextType = {
  cartItems: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (itemId: number) => void;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

export const CartProvider = ({ children }: Props) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  function addToCart(item: Product) {
    setCartItems([...cartItems, item]);
  }

  function removeFromCart(itemId: number) {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
