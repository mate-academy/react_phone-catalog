/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Product } from '../../types/Product';

type CartContextType = {
  cart: Product[];
  setCart: (newLiked: Product[]) => void;
  cartLength: number;
  setCartLength: React.Dispatch<React.SetStateAction<number>>;
};

export const CartContext = React.createContext<CartContextType>({
  cart: [],
  setCart: () => {},
  cartLength: 0,
  setCartLength: () => {},
});
type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<Product[]>('cart', []);
  const [cartLength, setCartLength] = useState(cart.length);

  const value = useMemo(
    () => ({ cart, setCart, cartLength, setCartLength }),
    [cart, setCart, cartLength, setCartLength],
  );

  return (
    <CartContext.Provider value={value}> {children} </CartContext.Provider>
  );
};
