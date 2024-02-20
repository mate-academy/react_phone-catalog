/* eslint-disable max-len */
import {
  createContext, useMemo,
} from 'react';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Product } from '../../types/Product';

type DefaultContextValue = {
  productsInCart: CartItem[],
  setProductsInCart: (v: CartItem[]) => void,
  countOfProductsInCart: number,
};

export const CartContext = createContext<DefaultContextValue>({
  productsInCart: [],
  setProductsInCart: () => {},
  countOfProductsInCart: 0,
});

type Props = {
  children: React.ReactNode;
};

type CartItem = {
  id: string,
  quantity: number,
  product: Product,
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [productsInCart, setProductsInCart] = useLocalStorage<CartItem[]>('cart', []);

  const countOfProductsInCart = productsInCart.reduce((acc, item) => acc + item.quantity, 0);

  const value = useMemo(() => ({
    productsInCart,
    setProductsInCart,
    countOfProductsInCart,
  }), [countOfProductsInCart, productsInCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
