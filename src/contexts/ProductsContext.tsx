import React, { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../services/products';

export const ProductsContext = React.createContext<Product[]>([]);

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(p => setProducts(p));
  }, []);

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};
