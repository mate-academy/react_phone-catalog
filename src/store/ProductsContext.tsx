import React, { useEffect, useMemo, useState } from 'react';
import { Product } from '../types/Product';
import { fetchAllProducts } from '../services/getProductsFromAPI';

type ProductsContextType = {
  productsList: Product[];
  isLoading: boolean;
  isError: boolean;
};

export const ProductsContext = React.createContext<ProductsContextType | null>(
  null,
);

type Props = {
  children: React.ReactNode;
};

export const ProductsContextProvider: React.FC<Props> = ({ children }) => {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    fetchAllProducts()
      .then(data => setProductsList(data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      productsList,
      isLoading,
      isError,
    }),
    [productsList, isLoading, isError],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
