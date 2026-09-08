/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import { Product } from './types/Product';
import {
  getAccessories,
  getPhones,
  getProducts,
  getSuggestedProducts,
  getTablets,
} from './api';
import { Gadget } from './types/Gadget';

type ProductsContextType = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  suggestedProducts: Product[];
  setSuggestedProducts: (products: Product[]) => void;
  phones: Gadget[];
  setPhones: (phones: Gadget[]) => void;
  tablets: Gadget[];
  setTablets: (tablets: Gadget[]) => void;
  accessories: Gadget[];
  setAccessories: (accessories: Gadget[]) => void;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  theme: string;
  setTheme: (theme: string) => void;
};

export const ProductsContext = React.createContext<ProductsContextType>({
  products: [],
  setProducts: () => {},
  suggestedProducts: [],
  setSuggestedProducts: () => {},
  phones: [],
  setPhones: () => {},
  tablets: [],
  setTablets: () => {},
  accessories: [],
  setAccessories: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
  isLoading: false,
  setIsLoading: () => {},
  theme: '',
  setTheme: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Gadget[]>([]);
  const [tablets, setTablets] = useState<Gadget[]>([]);
  const [accessories, setAccessories] = useState<Gadget[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('');

  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      getProducts(),
      getSuggestedProducts(),
      getPhones(),
      getTablets(),
      getAccessories(),
    ])
      .then(
        ([
          currentProducts,
          currentSuggestedProducts,
          currentPhones,
          currentTablets,
          currentAccessories,
        ]) => {
          setProducts(currentProducts);
          setSuggestedProducts(currentSuggestedProducts);
          setPhones(currentPhones);
          setTablets(currentTablets);
          setAccessories(currentAccessories);
        },
      )
      .catch(() => setErrorMessage('Unable to load products data'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    
  })

  const value = useMemo(
    () => ({
      products,
      setProducts,
      suggestedProducts,
      setSuggestedProducts,
      phones,
      setPhones,
      tablets,
      setTablets,
      accessories,
      setAccessories,
      errorMessage,
      setErrorMessage,
      isLoading,
      setIsLoading,
      theme,
      setTheme,
    }),
    [
      products,
      suggestedProducts,
      phones,
      tablets,
      accessories,
      isLoading,
      errorMessage,
      theme,
      setTheme,
    ],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
