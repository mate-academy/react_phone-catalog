import { createContext, ReactNode, useEffect, useState } from 'react';
import {
  Accessory,
  DataContextProps,
  Fav,
  Phone,
  Product,
  StorageCartItem,
  Tablet,
} from '../api/types';
import { getData } from '../api/api';
import { STORAGE_KEYS, StorageKey } from '../modules/shared/constants/storage';

const defaultContext: DataContextProps = {
  phones: [],
  products: [],
  tablets: [],
  accessories: [],
  isLoading: false,
  favItems: [],
  setFavItems: () => {},
  cartItems: [],
  setCartItems: () => {},
  clearCartItems: () => {},
};

export const DataContext = createContext(defaultContext);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [tablets, setTablets] = useState<Tablet[]>([]);
  const [accessories, setAccessories] = useState<Accessory[]>([]);

  const getInitialStorage = (key: StorageKey) => {
    try {
      const initialFav = localStorage.getItem(STORAGE_KEYS[key]);

      return initialFav ? JSON.parse(initialFav) : [];
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to load localStorage:', error);

      return [];
    }
  };

  const [favItems, setFavItems] = useState<Fav[]>(
    getInitialStorage('FAVOURITES'),
  );
  const [cartItems, setCartItems] = useState<StorageCartItem[]>(
    getInitialStorage('CART'),
  );

  const clearCartItems = () => {
    setCartItems([]); // Ustawiamy pustą tablicę -> koszyk wyczyszczony
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [phonesData, productsData, tabletsData, accessoriesData] =
          await Promise.all([
            getData('phones'),
            getData('products'),
            getData('tablets'),
            getData('accessories'),
          ]);

        setPhones(phonesData);
        setProducts(productsData);
        setTablets(tabletsData);
        setAccessories(accessoriesData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVOURITES, JSON.stringify(favItems));
    } catch {}
  }, [favItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  return (
    <DataContext.Provider
      value={{
        phones,
        products,
        tablets,
        accessories,
        isLoading,
        favItems,
        setFavItems,
        cartItems,
        setCartItems,
        clearCartItems,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
