import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from 'react';
import { Product } from '@/types/product';
import productsList from 'data/api/products.json';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

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
  const isOnline = useOnlineStatus();

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    if (!isOnline) {
      setError('No internet connection. Please check your network.');
      setIsLoading(false);

      return;
    }

    const timer = setTimeout(() => {
      try {
        setAllProducts(productsList as Product[]);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOnline]);

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
