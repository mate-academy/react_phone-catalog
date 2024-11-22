/* eslint-disable prettier/prettier */
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
import { useLocaleStorage } from './hooks/useLocaleStorage';
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
  pageNumber: 0,
  setPageNumber: () => {},
  slideDots: 0,
  setSlideDots: () => {},
  favouriteItems: [],
  setFavouriteItems: () => {},
  addedItems: [],
  setAddedItems: () => {},
  totalPrice: 1,
  setTotalPrice: () => {},
  favouriteOldItems: [],
  setFavouriteOldItems: () => {},
  oldAddedItems: [],
  setOldAddedItems: () => {},
  amountOfModels: 1,
  setAmountOfModels: () => {},
  totalModels: 0,
  setTotalModels: () => {},
  totalOldModels: 0,
  setTotalOldModels: () => {},
  totalOldProductsPrice: 0,
  setTotalOldProductsPrice: () => {},
  amountOfOldModels: 0,
  setAmountOfOldModels: () => {},
  visibleItems: [],
  setVisibleItems: () => {},
});

export const GlobalCatalogProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [phones, setPhones] = useState<ProductType[]>([]);
  const [tablets, setTablets] = useState<ProductType[]>([]);
  const [accessories, setAccessories] = useState<ProductType[]>([]);
  const [filter, setFilter] = useState<FilterType>(FilterType.AllPhones);
  const [products, setProducts] = useState<Product[]>([]);
  const [oldProducts, setOldProducts] = useState<OldProduct[]>([]);
  const [oldProductOffers, setOldProductOffers] = useState<OldProductType[]>(
    [],
  );
  const [favouriteItems, setFavouriteItems] = useLocaleStorage<Product[]>(
    'favouriteItems',
    [],
  );
  const [query, setQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState<ItemPerPage>(
    ItemPerPage.ALL,
  );
  const [slidePages, setSlidePages] = useState(0);
  const [slideDots, setSlideDots] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [addedItems, setAddedItems] = useLocaleStorage<Product[]>(
    'addedItems',
    [],
  );

  const [favouriteOldItems, setFavouriteOldItems] = useLocaleStorage<
  OldProduct[]
  >('favouriteOldItems', []);
  const [oldAddedItems, setOldAddedItems] = useLocaleStorage<OldProduct[]>(
    'oldAddedItems',
    [],
  );
  const [totalPrice, setTotalPrice] = useLocaleStorage('totalPrice', 0);
  const [amountOfModels, setAmountOfModels] = useLocaleStorage(
    'amountOfModels',
    1,
  );
  const [totalModels, setTotalModels] = useLocaleStorage('totalModels', 0);
  const [totalOldModels, setTotalOldModels] = useLocaleStorage(
    'totalOldModels',
    0,
  );
  const [totalOldProductsPrice, setTotalOldProductsPrice] = useLocaleStorage(
    'totalOldProductsPrice',
    0,
  );
  const [amountOfOldModels, setAmountOfOldModels] = useLocaleStorage(
    'amountOfOldModels',
    1,
  );
  const [visibleItems, setVisibleItems] = useState<Product[]>([]);

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

  useEffect(() => {
    localStorage.setItem('favouriteItems', JSON.stringify(favouriteItems));
  }, [favouriteItems]);

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
        pageNumber,
        setPageNumber,
        slideDots,
        setSlideDots,
        favouriteItems,
        setFavouriteItems,
        addedItems,
        setAddedItems,
        totalPrice,
        setTotalPrice,
        favouriteOldItems,
        setFavouriteOldItems,
        oldAddedItems,
        setOldAddedItems,
        amountOfModels,
        setAmountOfModels,
        totalModels,
        setTotalModels,
        totalOldModels,
        setTotalOldModels,
        totalOldProductsPrice,
        setTotalOldProductsPrice,
        amountOfOldModels,
        setAmountOfOldModels,
        visibleItems,
        setVisibleItems,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};
