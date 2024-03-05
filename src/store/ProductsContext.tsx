import React, { useEffect, useMemo, useState } from 'react';
import { getProducts } from '../api';
import { Product } from '../type/Product';

export const ProductsContext = React.createContext({
  products: [] as Product[],
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const value = useMemo(
    () => ({
      products,
    }),
    [products],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
