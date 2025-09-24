/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import {
  getAccessories,
  getPhones,
  getProducts,
  getSuggestedProducts,
  getTablets,
} from './api';

export type Product = {
  id: number;
  itemId: string;
  name: string;
  price: number;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
  image: string;
  category: 'phones' | 'tablets' | 'accessories';
  year: number;
};

export type Gadget = {
  id: string;
  name: string;
  namespaceId: string;
  priceDiscount: number;
  priceRegular: number;
  colorsAvailable: string[];
  capacityAvailable: string[];
  capacity: string;
  color: string;
  images: string[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  category: 'phones' | 'tablets' | 'accessories';
};

type ProductsContextType = {
  products: Product[];
  suggestedProducts: Product[];
  phones: Gadget[];
  tablets: Gadget[];
  accessories: Gadget[];
  errorMessage: string;
  isLoading: boolean;
};

export const ProductsContext = React.createContext<ProductsContextType>({
  products: [],
  suggestedProducts: [],
  phones: [],
  tablets: [],
  accessories: [],
  errorMessage: '',
  isLoading: false,
});

type Props = { children: React.ReactNode };

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Gadget[]>([]);
  const [tablets, setTablets] = useState<Gadget[]>([]);
  const [accessories, setAccessories] = useState<Gadget[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getProducts(),
      getSuggestedProducts(),
      getPhones(),
      getTablets(),
      getAccessories(),
    ])
      .then(([p, s, ph, t, a]) => {
        setProducts(p as Product[]);
        setSuggestedProducts(s as Product[]);
        setPhones(ph as Gadget[]);
        setTablets(t as Gadget[]);
        setAccessories(a as Gadget[]);
      })
      .catch(() => setErrorMessage('Unable to load products data'))
      .finally(() => setIsLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      products,
      suggestedProducts,
      phones,
      tablets,
      accessories,
      errorMessage,
      isLoading,
    }),
    [
      products,
      suggestedProducts,
      phones,
      tablets,
      accessories,
      errorMessage,
      isLoading,
    ],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
