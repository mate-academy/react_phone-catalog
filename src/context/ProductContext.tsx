import React, { createContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../features/API/apiSlice';

type ProductContextType = {
  products: Product[],
  isLoading: boolean,
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
  isLoading: false,
});

type Props = {
  children: React.ReactNode,
};

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <ProductContext.Provider value={{ products, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
};
