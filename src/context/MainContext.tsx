import React, { useState, useEffect, useMemo } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../services/getProducts';

type Props = {
  children: React.ReactNode;
};

export const MainContext = React.createContext<{
  currentPage: string;
  products: Product[];
  phones: Product[];
  tablets: Product[];
  accessories: Product[];
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setPhones: React.Dispatch<React.SetStateAction<Product[]>>;
  setTablets: React.Dispatch<React.SetStateAction<Product[]>>;
  setAccessories: React.Dispatch<React.SetStateAction<Product[]>>;
}>({
  currentPage: 'Home',
  products: [],
  phones: [],
  tablets: [],
  accessories: [],
  setCurrentPage: () => {},
  setProducts: () => {},
  setPhones: () => {},
  setTablets: () => {},
  setAccessories: () => {},
});

export const MainProvider: React.FC<Props> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('Home');
  const [products, setProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Product[]>([]);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);

  const getProductsFromServer = async () => {
    try {
      const data = await getProducts();

      setProducts(data);
      setPhones(data.filter((item) => item.category === 'phones'));
      setTablets(data.filter((item) => item.category === 'tablets'));
      setAccessories(data.filter((item) => item.category === 'accessories'));
    } catch {
      // eslint-disable-next-line no-console
      console.warn('products loading error!');
    }
  };

  useEffect(() => {
    getProductsFromServer();
  }, []);

  const value = useMemo(
    () => ({
      currentPage,
      setCurrentPage,
      products,
      setProducts,
      phones,
      setPhones,
      tablets,
      setTablets,
      accessories,
      setAccessories,
    }),
    [
      currentPage,
      setCurrentPage,
      products,
      setProducts,
      phones,
      setPhones,
      tablets,
      setTablets,
      accessories,
      setAccessories,
    ],
  );

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
