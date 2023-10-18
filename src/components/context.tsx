import React, { useState, ReactNode, useEffect } from 'react';
import { ProductType } from '../types/Product';
import { getProducts } from '../api/api';

type ContextValue = {
  cart: ProductType[] | undefined,
  setCart: React.Dispatch<React.SetStateAction<ProductType[] | undefined>>,
  favorite: ProductType[] | undefined,
  setFavorite: React.Dispatch<React.SetStateAction<ProductType[] | undefined>>,
  activeProduct: ProductType | undefined,
  setActiveProduct:
  React.Dispatch<React.SetStateAction<ProductType | undefined>>,

  products:ProductType[],
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>,
};

export const Context = React.createContext<ContextValue>({
  cart: [],
  setCart: () => {},
  favorite: undefined,
  setFavorite: () => {},
  activeProduct: JSON.parse(`${localStorage.getItem('activeProduct')}`),
  setActiveProduct: () => {},
  products: [],
  setProducts: () => {},
});

type Props = {
  children: ReactNode
};

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [
    cart,
    setCart,
  ] = useState<ProductType[] | undefined>(JSON.parse(`${localStorage.getItem('cart')}`));

  const [
    favorite,
    setFavorite,
  ] = useState<ProductType[] | undefined>(JSON.parse(`${localStorage.getItem('favorite')}`));

  const [activeProduct, setActiveProduct] = useState<ProductType>();

  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    getProducts()
      .then((productList) => {
        setProducts(productList);
      });
  }, []);

  const contextValue:ContextValue = {
    cart,
    setCart,

    favorite,
    setFavorite,

    activeProduct,
    setActiveProduct,

    products,
    setProducts,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};
