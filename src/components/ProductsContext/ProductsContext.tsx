import React, { useState, useEffect } from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/httpClient';

export const ProductsContext = React.createContext([] as Product[]);

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};
