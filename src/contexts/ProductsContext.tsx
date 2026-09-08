import React, { createContext, useContext, ReactNode } from 'react';
import { ProductType } from '../types/ProductType';

type ProductsContextType = {
  products: ProductType[];
  error: unknown;
  isLoading: boolean;
};

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

type ProductsProviderProps = {
  products: ProductType[];
  error: unknown;
  isLoading: boolean;
  children: ReactNode;
};

export const ProductsProvider: React.FC<ProductsProviderProps> = ({
  children,
  products,
  error,
  isLoading,
}) => {
  return (
    <ProductsContext.Provider value={{ products, error, isLoading }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }

  return context;
};
