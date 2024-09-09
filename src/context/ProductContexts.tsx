import React, { useState, useCallback } from 'react';
import { Product } from '../types';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  goods: Product[] | null;
  updateGoods: (values: Product[]) => void;
};

export const ProductsContext = React.createContext<ContextType>({
  goods: [],
  updateGoods: () => {
    throw new Error('updateGoods function must be overridden');
  },
});

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [goods, setGoods] = useState<Product[]>([]);

  const updateGoods = useCallback((data: Product[]) => {
    if (data && data.length) {
      setGoods(data);
    }
  }, []);

  return (
    <ProductsContext.Provider value={{ goods, updateGoods }}>
      {children}
    </ProductsContext.Provider>
  );
};
