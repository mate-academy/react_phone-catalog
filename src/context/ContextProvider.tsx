import { createContext, ReactNode, useEffect, useState } from 'react';
import { DataContextProps, Phone, Product } from '../api/types';
import { getPhones, getProducts } from '../api/api';

const defaultContext: DataContextProps = {
  phones: [],
  products: [],
  isLoading: false,
};

export const DataContext = createContext(defaultContext);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

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

  return (
    <DataContext.Provider value={{ phones, products, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};
