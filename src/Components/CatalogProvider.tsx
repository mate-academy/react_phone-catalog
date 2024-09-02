/* eslint-disable prettier/prettier */
import { FilterType } from './types/FilterType';
import { ContextType } from './types/ContextType';
import { createContext, useEffect, useState } from 'react';
import { PhonesType } from './types/phones';
import { HotPricesProduct } from './types/HotPricesProducts';
import { Product } from './types/Product';
import { getPhones, getProducts } from '../api/products';

export const CatalogContext = createContext<ContextType>({
  filter: FilterType.AllPhones,
  setFilter: () => {},
  phones: [],
  setPhones: () => {},
  hotPricesProducts: [],
  setHotPricesProducts: () => {},
  products: [],
  setProducts: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const GlobalCatalogProvider = ({ children }: Props) => {
  const [phones, setPhones] = useState<PhonesType[]>([]);
  const [filter, setFilter] = useState<FilterType>(FilterType.AllPhones);
  const [hotPricesProducts, setHotPricesProducts] = useState<
  HotPricesProduct[]
  >([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getPhones().then(setPhones);
  }, []);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <CatalogContext.Provider
      value={{
        phones,
        setPhones,
        filter,
        setFilter,
        hotPricesProducts,
        setHotPricesProducts,
        products,
        setProducts,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};
