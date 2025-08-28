import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { ProductType } from '../types/ProductType';

export type InitialState = ProductType[];

const initialState: InitialState = [];

export const ApiContext = createContext<InitialState>(initialState);

interface GlobalProviderProps {
  children: ReactNode;
}

export const ApiProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(() => alert('i cant load file'));
  }, []);

  return <ApiContext.Provider value={products}>{children}</ApiContext.Provider>;
};
