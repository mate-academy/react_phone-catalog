import React, { useMemo, ReactNode, useState, useEffect } from 'react';
import { createContext } from 'react';
import { getProducts } from '../api/products';
import { Product } from '../types/Product';

interface AppContextType {
  products: Product[];
}

export const AppContext = createContext<AppContextType>({ products: [] });

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setIsLoading(true);
    setProducts([]);

    getProducts()
      .then(data => {
        setProducts(data);
      })
      .finally(() => setIsLoading(false));
  }, [setProducts]);

  const value = useMemo(
    () => ({
      products,
    }),
    [products],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
