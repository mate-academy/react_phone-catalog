import { getProducts } from '@/api/api';
import { Product } from '@/types/Product';
import React, { useContext, useEffect, useMemo, useState } from 'react';

export const ProductsContext = React.createContext({
  products: [] as Product[],
  isLoading: true,
  errorMessage: '',
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(setProducts)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      products,
      isLoading,
      errorMessage,
    }),
    [products, isLoading, errorMessage],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export function useProducts() {
  const products = useContext(ProductsContext);

  return products;
}
