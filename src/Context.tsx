import React, { ReactElement, useState } from 'react';
import { Product } from './types/Product';
import { CartProduct } from './types/CartProduct';

type ContextProps = {
  activeProduct: Product | null,
  setActiveProduct(product: Product): void,
  chosenProducts: Product[],
  setChosenProducts(products: Product[]): void,
  productsToBuy: CartProduct[],
  setProductsToBuy(products: CartProduct[]): void,
  loadingItem: number | null,
  setLoadingItem(number: number | null): void,
};

type ProviderProps = {
  children: ReactElement;
};

export const Context = React.createContext<ContextProps>({
  activeProduct: null,
  setActiveProduct: () => {},
  chosenProducts: [],
  setChosenProducts: () => {},
  productsToBuy: [],
  setProductsToBuy: () => {},
  loadingItem: null,
  setLoadingItem: () => {},
});

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [chosenProducts, setChosenProducts] = useState<Product[]>([]);
  const [productsToBuy, setProductsToBuy] = useState<CartProduct[]>([]);
  const [loadingItem, setLoadingItem] = useState<null | number>(null);
  const contextValue = {
    activeProduct,
    setActiveProduct,
    chosenProducts,
    setChosenProducts,
    productsToBuy,
    setProductsToBuy,
    loadingItem,
    setLoadingItem,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};
