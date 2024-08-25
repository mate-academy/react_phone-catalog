import React, { useState, useCallback } from 'react';
import { Product } from '../types/types';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  goods: Product[] | null;
  updateGoods: (values: Product[]) => void;
};

export const ProductsContext = React.createContext<ContextType>({
  goods: null,
  updateGoods: ([]) => {},
});

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [goods, setGoods] = useState<Product[]>([]);

  const updateGoods = useCallback((data: Product[]) => {
    if (data && data?.length) {
      setGoods(data);
    }
  }, []);

  return (
    <ProductsContext.Provider value={{ goods, updateGoods }}>{children}</ProductsContext.Provider>
  );
};
