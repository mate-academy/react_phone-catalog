import React, { ReactNode, useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../api/products';

type ContextValue = {
  products: Product[] | null;
  setProducts: React.Dispatch<React.SetStateAction<Product[] | null>>;
};

export const ProductContext = React.createContext<ContextValue>({
  products: null,
  setProducts: () => {},
});

type Props = {
  children: ReactNode;
};

export const ProductContextProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    getProducts().then(productsFromServer => setProducts(productsFromServer));
  }, []);

  const value = { products, setProducts };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
