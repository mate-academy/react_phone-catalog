import React, { ReactElement, useState } from 'react';
import { Product } from './types/Product';
import { CartProduct } from './types/CartProduct';
import { useLocaleStorage } from './utils/hooks';
import { LocaleStorageTypes } from './types/LocaleStorageTypes';

type ContextProps = {
  chosenProducts: Product[],
  setChosenProducts(products: Product[]): void,
  productsToBuy: CartProduct[],
  setProductsToBuy(products: CartProduct[]): void,
  loadingItem: string,
  setLoadingItem(number: string): void,
};

type ProviderProps = {
  children: ReactElement;
};

export const Context = React.createContext<ContextProps>({
  chosenProducts: [],
  setChosenProducts: () => {},
  productsToBuy: [],
  setProductsToBuy: () => {},
  loadingItem: '',
  setLoadingItem: () => {},
});

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [chosenProducts, setChosenProducts]
    = useLocaleStorage<Product[]>(LocaleStorageTypes.favourites, []);
  const [productsToBuy, setProductsToBuy]
    = useLocaleStorage<CartProduct[]>(LocaleStorageTypes.toBuy, []);
  const [loadingItem, setLoadingItem] = useState<string>('');
  const contextValue = {
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
