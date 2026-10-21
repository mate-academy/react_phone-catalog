import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getProducts } from '../api/products';
import { Product } from '../types/Product';

interface ProductsContextType {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  reload: () => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setIsLoading(true);
    setError(null);

    getProducts()
      .then(data => {
        setProducts(data);
        setError(null);
      })
      .catch(() => {
        setError('Failed to load products. Please try again.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const value = useMemo(
    () => ({
      products,
      isLoading,
      error,
      reload,
    }),
    [products, isLoading, error, reload],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used within ProductsProvider');
  }

  return context;
};
