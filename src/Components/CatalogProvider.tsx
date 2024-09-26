import { FilterType } from './types/FilterType';
import { ContextType } from './types/ContextType';
import { createContext, useEffect, useState } from 'react';
import { ProductType } from './types/phones';
import { OldProduct } from './types/OldProducts';
import { Product } from './types/Product';
import {
  getAccessories,
  getOldOffer,
  getOldProducts,
  getPhones,
  getProducts,
  getTablets,
} from '../api/products';
import { OldProductType } from './types/OldProductType';
import { ItemPerPage } from './types/ItemPerPage';

export const CatalogContext = createContext<ContextType>({
  filter: FilterType.AllPhones,
  setFilter: () => {},
  phones: [],
  setPhones: () => {},
  tablets: [],
  setTablets: () => {},
  accessories: [],
  setAccessories: () => {},
  oldProducts: [],
  setOldProducts: () => {},
  oldProductOffers: [],
  setOldProductOffers: () => {},
  products: [],
  setProducts: () => {},
  query: '',
  setQuery: () => {},
  itemsPerPage: ItemPerPage.ALL,
  setItemsPerPage: () => {},
  slidePages: 0,
  setSlidePages: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const GlobalCatalogProvider = ({ children }: Props) => {
  const [phones, setPhones] = useState<ProductType[]>([]);
  const [tablets, setTablets] = useState<ProductType[]>([]);
  const [accessories, setAccessories] = useState<ProductType[]>([]);
  const [filter, setFilter] = useState<FilterType>(FilterType.AllPhones);
  const [products, setProducts] = useState<Product[]>([]);
  const [oldProducts, setOldProducts] = useState<OldProduct[]>([]);
  const [oldProductOffers, setOldProductOffers] = useState<OldProductType[]>(
    [],
  );
  const [query, setQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState<ItemPerPage>(
    ItemPerPage.ALL,
  );
  const [slidePages, setSlidePages] = useState(0);

  useEffect(() => {
    getPhones().then(setPhones);
  }, []);

  useEffect(() => {
    getTablets().then(setTablets);
  }, []);

  useEffect(() => {
    getAccessories().then(setAccessories);
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
        tablets,
        setTablets,
        accessories,
        setAccessories,
        filter,
        setFilter,
        oldProducts,
        setOldProducts,
        products,
        setProducts,
        oldProductOffers,
        setOldProductOffers,
        query,
        setQuery,
        itemsPerPage,
        setItemsPerPage,
        slidePages,
        setSlidePages,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};
