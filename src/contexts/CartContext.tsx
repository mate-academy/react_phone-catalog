import React, { useEffect, useMemo, useState } from 'react';
import { CartType } from '../types/CartType';

type CartContextType = {
  cart: CartType[];
  setCart: React.Dispatch<React.SetStateAction<CartType[]>>;
};

export const CartContext = React.createContext<CartContextType>({
  cart: [],
  setCart: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<CartType[]>(
    JSON.parse(localStorage.getItem('cart') || '[]'),
  );

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      setCart,
    }),
    [cart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
