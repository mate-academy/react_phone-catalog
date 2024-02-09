import React, { useEffect, useState } from 'react';
import { Product } from './types/Product';
import { ContextType } from './types/ContextType';
import { getProducts } from './utils/api-phones';

export const GlobalContext = React.createContext<ContextType>({
  products: [],
  phones: [],
  tablets: [],
  accessories: [],
  setProducts: () => { },
  isLoading: false,
});

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const phones = products.filter(item => item.category === 'phones');
  const tablets = products.filter(item => item.category === 'tablets');
  const accessories = products.filter(item => item.category === 'accessories');

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(setProducts)
      .catch(() => {
        return 'Error';
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const value = {
    products,
    phones,
    tablets,
    accessories,
    setProducts,
    isLoading,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};
