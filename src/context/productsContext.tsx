import React, { ReactNode, useState, useEffect } from 'react';
import { Product } from '../types';
import { getProducts } from '../api/products';

type ProductContext = {
  products: Product[],
};

export const ProductsContext = React.createContext<ProductContext>({
  products: [],
} as ProductContext);

type Props = {
  children: ReactNode,
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(setProducts);
  }, []);

  const value = {
    products,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = (
):ProductContext => React.useContext(ProductsContext);
