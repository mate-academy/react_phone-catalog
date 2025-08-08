/* eslint-disable @typescript-eslint/indent */
import React, { createContext, useCallback, useMemo } from 'react';
import { Product } from '../types/ProductType';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface CartContextType {
  cartProducts: Product[];
  toggleCart: (product: Product) => void;
  deleteProduct: (productId: number) => void;
  increaseProductCount: (productId: number) => void;
  decreaseProductCount: (productId: number) => void;
}

export const CartContext = createContext<CartContextType>({
  cartProducts: [],
  toggleCart: () => {},
  deleteProduct: () => {},
  increaseProductCount: () => {},
  decreaseProductCount: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartProducts, setCartProducts] = useLocalStorage<Product[]>(
    'cart',
    [],
  );

  const toggleCart = useCallback(
    (product: Product) => {
      setCartProducts(prev => {
        if (prev.some(p => p.id === product.id)) {
          return prev.filter(p => p.id !== product.id);
        } else {
          return [...prev, { ...product, totalCount: 1 }];
        }
      });
    },
    [setCartProducts],
  );

  const increaseProductCount = useCallback(
    (productId: number) => {
      setCartProducts(prev =>
        prev.map(product =>
          product.id === productId
            ? { ...product, totalCount: (product.totalCount || 1) + 1 }
            : product,
        ),
      );
    },
    [setCartProducts],
  );

  const decreaseProductCount = useCallback(
    (productId: number) => {
      setCartProducts(prev =>
        prev.map(product =>
          product.id === productId
            ? { ...product, totalCount: (product.totalCount || 1) - 1 }
            : product,
        ),
      );
    },
    [setCartProducts],
  );

  const deleteProduct = useCallback(
    (productId: number) => {
      setCartProducts(prev => prev.filter(product => product.id !== productId));
    },
    [setCartProducts],
  );

  const valueProps = useMemo(
    () => ({
      toggleCart,
      cartProducts,
      increaseProductCount,
      decreaseProductCount,
      deleteProduct,
    }),
    [
      toggleCart,
      cartProducts,
      increaseProductCount,
      decreaseProductCount,
      deleteProduct,
    ],
  );

  return (
    <CartContext.Provider value={valueProps}>{children}</CartContext.Provider>
  );
};
