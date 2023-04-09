import React from 'react';
import { useLocalstorage } from '../hooks/useLocalstorage';
import { ProductsContextType } from '../types/ProductsContextType';

export const ProductsContext
= React.createContext<ProductsContextType>({
  cartList: [],
  setCartList: () => {},
});

export const ProductProvider: React.FC<React.ReactNode>
= ({ children }) => {
  const [cartList, setCartList] = useLocalstorage('cartList', []);

  const contextValue = {
    cartList,
    setCartList,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
