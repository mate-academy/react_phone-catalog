import React, { useState, useCallback } from 'react';
import { Phone } from '../types';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  goods: Phone[] | null;
  updateGoods: (values: Phone[]) => void;
};

export const ProductsContext = React.createContext<ContextType>({
  goods: [],
  updateGoods: () => {},
});

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [goods, setGoods] = useState<Phone[]>([]);

  const updateGoods = useCallback((data: Phone[]) => {
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
