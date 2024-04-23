import React, { createContext, useEffect } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

type PropsCartContext = {
  cartProducts: Product[];
  setCartProducts: (cartProducts: Product[]) => void;
};

type Props = {
  children: React.ReactNode;
};

export const CartContext = createContext<PropsCartContext>({
  cartProducts: [],
  setCartProducts: () => {},
});

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartProducts, setCartProducts] = useLocalStorage<Product[]>(
    'cart',
    [],
  );

  useEffect(() => {
    setCartProducts(cartProducts);
  }, [cartProducts, setCartProducts]);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
