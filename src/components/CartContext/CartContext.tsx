import React, { useState } from 'react';
import { Product } from '../../helpers/types/Product';

interface ContextType {
  cartedProducts: Product[] | [],
  setCartedProducts: React.Dispatch<React.SetStateAction<Product[] | []>>,
  favProducts: Product[] | [],
  setFavProducts: React.Dispatch<React.SetStateAction<Product[] | []>>,
}

export const CartedProduct = React.createContext<ContextType>({
  cartedProducts: [],
  setCartedProducts: () => {},
  favProducts: [],
  setFavProducts: () => {},
});

type Props = {
  children: JSX.Element;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const cartedProductsFromMemory = JSON.parse(window.localStorage
    .getItem('cartedProducts') || '[]') as Product[] | [];
  const [cartedProducts, setCartedProducts] = useState<Product[] | []>(
    cartedProductsFromMemory,
  );
  const favProductsFromMemory = JSON.parse(window.localStorage
    .getItem('favProducts') || '[]') as Product[] | [];
  const [favProducts, setFavProducts] = useState<Product[] | []>(
    favProductsFromMemory,
  );
  const contextValue = {
    cartedProducts,
    setCartedProducts,
    favProducts,
    setFavProducts,
  };

  return (
    <CartedProduct.Provider value={contextValue}>
      {children}
    </CartedProduct.Provider>
  );
};
