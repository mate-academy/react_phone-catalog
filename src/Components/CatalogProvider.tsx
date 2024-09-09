import { FilterType } from './types/FilterType';
import { ContextType } from './types/ContextType';
import { createContext, useEffect, useState } from 'react';
import { PhonesType } from './types/phones';
import { OldProduct } from './types/OldProducts';
import { Product } from './types/Product';
import {
  getOldOffer,
  getOldProducts,
  getPhones,
  getProducts,
} from '../api/products';
import { OldProductType } from './types/OldProductType';

export const CatalogContext = createContext<ContextType>({
  filter: FilterType.AllPhones,
  setFilter: () => {},
  phones: [],
  setPhones: () => {},
  oldProducts: [],
  setOldProducts: () => {},
  oldProductOffers: [],
  setOldProductOffers: () => {},
  products: [],
  setProducts: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const GlobalCatalogProvider = ({ children }: Props) => {
  const [phones, setPhones] = useState<PhonesType[]>([]);
  const [filter, setFilter] = useState<FilterType>(FilterType.AllPhones);
  const [products, setProducts] = useState<Product[]>([]);
  const [oldProducts, setOldProducts] = useState<OldProduct[]>([]);
  const [oldProductOffers, setOldProductOffers] = useState<OldProductType[]>(
    [],
  );

  useEffect(() => {
    getPhones().then(setPhones);
  }, []);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  useEffect(() => {
    getOldProducts().then(setOldProducts);
  }, []);

  useEffect(() => {
    getOldOffer().then(setOldProductOffers);
  }, []);

  return (
    <CatalogContext.Provider
      value={{
        phones,
        setPhones,
        filter,
        setFilter,
        oldProducts,
        setOldProducts,
        products,
        setProducts,
        oldProductOffers,
        setOldProductOffers,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};
