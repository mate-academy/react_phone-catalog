import React, { useEffect, useMemo, useState } from 'react';
import { request } from './getProducts';

import { Product } from '../types/Product';

type Context = {
  products: Product[],
  setProducts: React.Dispatch<React.SetStateAction<never[]>>,
};

export const ProductsContext = React.createContext<Context>({
  products: [],
  setProducts: () => {},
});

export const ProductsProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    request().then(setProducts);
  }, []);

  const contextValue = useMemo(() => {
    return {
      products,
      setProducts,
    };
  }, [products]);

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
