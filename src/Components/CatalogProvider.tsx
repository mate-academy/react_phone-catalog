/* eslint-disable prettier/prettier */
import { ContextType } from './types/ContextType';
import { createContext, useEffect, useState } from 'react';
import { ProductType } from './types/phones';
import { Product } from './types/Product';
import {
  getAccessories,
  getPhones,
  getProducts,
  getTablets,
} from '../api/products';
import { useLocaleStorage } from './hooks/useLocaleStorage';
export const CatalogContext = createContext<ContextType>({
  phones: [],
  setPhones: () => {},
  tablets: [],
  setTablets: () => {},
  accessories: [],
  setAccessories: () => {},
  products: [],
  setProducts: () => {},
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
  totalModels: 0,
  setTotalModels: () => {},
  visibleItems: [],
  setVisibleItems: () => {},
  loading: false,
  setLoading: () => {},
  themeSwitcher: false,
  setThemeSwitcher: () => {},
});

export const GlobalCatalogProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [phones, setPhones] = useState<ProductType[]>([]);
  const [tablets, setTablets] = useState<ProductType[]>([]);
  const [accessories, setAccessories] = useState<ProductType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [favouriteItems, setFavouriteItems] = useLocaleStorage<Product[]>(
    'favouriteItems',
    [],
  );
  const [slidePages, setSlidePages] = useState(0);
  const [slideDots, setSlideDots] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [addedItems, setAddedItems] = useLocaleStorage<Product[]>(
    'addedItems',
    [],
  );

  const [totalPrice, setTotalPrice] = useLocaleStorage('totalPrice', 0);
  const [totalModels, setTotalModels] = useLocaleStorage('totalModels', 0);
  const [visibleItems, setVisibleItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line max-len
  const [themeSwitcher, setThemeSwitcher] = useLocaleStorage('themeSwitcher', false);

  useEffect(() => {
    setLoading(true);
    getPhones().then(setPhones).finally(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getTablets().then(setTablets).finally(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getAccessories().then(setAccessories).finally(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getProducts().then(setProducts).finally(() => {
      setLoading(false);
    });
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
        products,
        setProducts,
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
        totalModels,
        setTotalModels,
        visibleItems,
        setVisibleItems,
        loading,
        setLoading,
        themeSwitcher,
        setThemeSwitcher,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};
