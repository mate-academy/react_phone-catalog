import { createContext, ReactNode, useEffect, useState } from 'react';
import { DataContextProps, Phone, Product } from '../api/types';
import { getPhones, getProducts } from '../api/api';
import { STORAGE_KEYS } from '../modules/shared/constants/storage';

const defaultContext: DataContextProps = {
  phones: [],
  products: [],
  isLoading: false,
  favItems: [],
  setFavItems: () => {},
};

export const DataContext = createContext(defaultContext);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const getInitialFavourites = () => {
    try {
      const initialFav = localStorage.getItem(STORAGE_KEYS.FAVOURITES);

      return initialFav ? JSON.parse(initialFav) : [];
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to load localStorage:', error);

      return [];
    }
  };

  const [favItems, setFavItems] = useState<number[]>(getInitialFavourites);

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

  return (
    <DataContext.Provider
      value={{ phones, products, isLoading, favItems, setFavItems }}
    >
      {children}
    </DataContext.Provider>
  );
};
