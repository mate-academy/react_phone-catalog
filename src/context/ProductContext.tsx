import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from 'react';
import { Product } from '@/types/product';
import productsList from 'data/api/products.json';

export type ProductContextType = {
  allProducts: Product[];
  isLoading: boolean;
  error: string | null;
};

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setAllProducts(productsList as Product[]);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load products');
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      allProducts,
      isLoading,
      error,
    }),
    [allProducts, isLoading, error],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
