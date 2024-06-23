/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';

type InitialType = {
  cartProducts: [Product, number][] | [];
  setCartProducts: React.Dispatch<
    React.SetStateAction<[Product, number][] | []>
  >;
};

const initialValue: InitialType = {
  cartProducts: [],
  setCartProducts: () => {},
};

export const CartContext = React.createContext(initialValue);

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const storageProducts = localStorage.getItem('cartProducts');

  const [cartProducts, setCartProducts] = useState<[Product, number][] | []>(
    storageProducts ? JSON.parse(storageProducts) : [],
  );

  useEffect(() => {
    const produ = localStorage.getItem('cartProducts');

    if (produ) {
      setCartProducts(JSON.parse(produ));
    }
  }, []);

  useEffect(() => {
    localStorage.removeItem('cartProducts');

    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

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
