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
  pageNumber: 0,
  setPageNumber: () => {},
  slideDots: 0,
  setSlideDots: () => {},
  favouriteItems: [],
  setFavouriteItems: () => {},
  isFavourite: false,
  setIsFavourite: () => {},
  addedItems: [],
  setAddedItems: () => {},
  isAdded: false,
  setIsAdded: () => {},
  totalPrice: 1,
  setTotalPrice: () => {},
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
  const [favouriteItems, setFavouriteItems] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState<ItemPerPage>(
    ItemPerPage.ALL,
  );
  const [slidePages, setSlidePages] = useState(0);
  const [slideDots, setSlideDots] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [addedItems, setAddedItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

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
        isFavourite,
        setIsFavourite,
        addedItems,
        setAddedItems,
        isAdded,
        setIsAdded,
        totalPrice,
        setTotalPrice,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};
