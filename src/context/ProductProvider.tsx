import React, { useState } from 'react';
import { Product } from '../types/Product';
import { ProductContext } from './ProductContext';

type ProductProviderProps = {
  children: React.ReactNode;
};

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [products, setProduct] = useState<Product[]>([]);

  return (
    <ProductContext.Provider
      value={{
        products: products,
        setProduct,
        errorMessage,
        setErrorMessage,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
