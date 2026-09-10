/* eslint-disable @typescript-eslint/indent */

import { CartProduct } from '@/types/CartProduct';
import { createContext, useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

type CartState = CartProduct[] | null;
type CartDispatch =
  | null
  | ((
      value: CartProduct[] | ((prevState: CartProduct[]) => CartProduct[]),
    ) => void);

export const CartStateContext = createContext<CartState>(null);
export const CartDispatchContext = createContext<CartDispatch>(null);

export const CartProvider = ({ children }: Props) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>(() => {
    const storedProducts = localStorage.getItem('cart');

    if (!storedProducts) {
      return [];
    }

    try {
      return JSON.parse(storedProducts);
    } catch {
      localStorage.removeItem('cart');

      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartProducts));
  }, [cartProducts]);

  return (
    <CartStateContext.Provider value={cartProducts}>
      <CartDispatchContext.Provider value={setCartProducts}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};
