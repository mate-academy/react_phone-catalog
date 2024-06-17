import { createContext, useEffect, useMemo, useState } from 'react';
import { Product } from '../types/Product';

type ProductWithCount = Product & {
  count: number;
};

type CardContextType = {
  cart: ProductWithCount[];
  setCart: React.Dispatch<React.SetStateAction<ProductWithCount[]>>;
};

export const CartContext = createContext<CardContextType>({
  cart: [],
  setCart: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const localCart = JSON.parse(
    localStorage.getItem('cart') ?? JSON.stringify([]),
  );

  const [cart, setCart] = useState<ProductWithCount[]>(localCart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart) ?? JSON.stringify([]));
  }, [cart]);

  const value = useMemo(() => ({ cart, setCart }), [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
