import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../api/api';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const ProductsContext = createContext<ProductsState | null>(null);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);

    getProducts()
      .then(setProducts)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Unknown error');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const value = useMemo<ProductsState>(
    () => ({ products, loading, error, refetch: load }),
    [products, loading, error, load],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error('useProducts must be used inside ProductsProvider');
  }
  return ctx;
};
