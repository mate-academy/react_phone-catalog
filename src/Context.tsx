import React, { ReactElement, useState } from 'react';
import { Product } from './types/Product';
import { CartProduct } from './types/CartProduct';

type ContextProps = {
  query: string,
  setQuery(string: string): void,
  activeProduct: Product | null,
  setActiveProduct(product: Product): void,
  chosenProducts: string[],
  setChosenProducts(productIds: string[]): void,
  productsToBuy: CartProduct[],
  setProductsToBuy(products: CartProduct[]): void,
};

type ProviderProps = {
  children: ReactElement;
};

export const Context = React.createContext<ContextProps>({
  query: '',
  activeProduct: null,
  setQuery: () => {},
  setActiveProduct: () => {},
  chosenProducts: [],
  setChosenProducts: () => {},
  productsToBuy: [],
  setProductsToBuy: () => {},
});

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [query, setQuery] = useState('');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [chosenProducts, setChosenProducts] = useState<string[]>([]);
  const [productsToBuy, setProductsToBuy] = useState<CartProduct[]>([]);
  const contextValue = {
    query,
    setQuery,
    activeProduct,
    setActiveProduct,
    chosenProducts,
    setChosenProducts,
    productsToBuy,
    setProductsToBuy,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};
