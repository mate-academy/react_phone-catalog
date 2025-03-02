import React, { useCallback, useState } from 'react';
import { Product } from '../types/types';

type ProductsContextType = {
  goods: Product[] | null;
  updateGoods: (products: Product[]) => void;
};

type ProductsProviderProps = {
  children: React.ReactNode;
};

export const ProductsContext = React.createContext<ProductsContextType>({
  goods: null,
  updateGoods: ([]) => [],
});

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const [goods, setGoods] = useState<Product[]>([]);

  const updateGoods = useCallback((data: Product[]) => {
    if (data && data.length) {
      setGoods(data);
    }
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        goods,
        updateGoods,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
