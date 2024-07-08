/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Product } from '../../types/Product';

type CartContextType = {
  cart: Product[];
  setCart: (newLiked: Product[]) => void;
};

export const CartContext = React.createContext<CartContextType>({
  cart: [],
  setCart: () => {},
});
type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<Product[]>('cart', []);

  const value = useMemo(() => ({ cart, setCart }), [cart, setCart]);

  return (
    <CartContext.Provider value={value}> {children} </CartContext.Provider>
  );
};
