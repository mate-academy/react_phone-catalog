import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Product } from '../types';
import { getProducts } from '@/services/products';

type ProductsContextType = {
  products: Product[];
  isLoading: boolean;
  hasError: boolean;
  loadData: () => Promise<void>;
};

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchData = useCallback(async () => {
    if (!navigator.onLine) {
      return;
    }

    setIsLoading(true);
    setHasError(false);

    try {
      const data = await getProducts();

      setProducts(data);
      setHasError(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const value = useMemo(
    () => ({
      products,
      isLoading,
      hasError,
      loadData: fetchData,
    }),
    [products, isLoading, hasError, fetchData],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }

  return context;
};
