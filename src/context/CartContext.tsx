/* eslint-disable import/extensions */
import { CartProduct } from '@/types/CartProduct';
import React, { createContext, useEffect, useState } from 'react';

interface CartContextType {
  cart: CartProduct[];
  setCart: (products: CartProduct[]) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartProduct[]>(() => {
    const saved = localStorage.getItem('cart');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const value = {
    cart,
    setCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
