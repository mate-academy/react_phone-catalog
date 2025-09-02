import { createContext, ReactNode, useEffect, useState } from 'react';
import { DataContextProps, Phone, Product } from '../api/types';
import { getPhones, getProducts } from '../api/api';
import { STORAGE_KEYS, StorageKey } from '../modules/shared/constants/storage';

const defaultContext: DataContextProps = {
  phones: [],
  products: [],
  isLoading: false,
  favItems: [],
  setFavItems: () => {},
  cartItems: [],
  setCartItems: () => {},
};

export const DataContext = createContext(defaultContext);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

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

  const [favItems, setFavItems] = useState<number[]>(
    getInitialStorage('FAVOURITES'),
  );
  const [cartItems, setCartItems] = useState<number[]>(
    getInitialStorage('CART'),
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [phonesData, productsData] = await Promise.all([
          getPhones(),
          getProducts(),
        ]);

        setPhones(phonesData);
        setProducts(productsData);
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
        isLoading,
        favItems,
        setFavItems,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
