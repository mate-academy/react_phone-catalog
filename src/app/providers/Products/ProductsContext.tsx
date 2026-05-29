import { api } from '@/api/api';
import { Product } from '@/shared/type';
import {
  createContext,
  useCallback,
  useContext,
  ReactNode,
  useRef,
  useState,
} from 'react';

type ProductsContextType = {
  products: Product[] | null;
  loading: boolean;
  error: string | null;
  loadProducts: () => Promise<Product[]>;
};

const ProductsContext = createContext<ProductsContextType | null>(null);

type Props = {
  children: ReactNode;
};

export function ProductsProvider({ children }: Props) {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestRef = useRef<Promise<Product[]> | null>(null);

  const loadProducts = useCallback(async () => {
    if (products) {
      return products;
    }

    if (requestRef.current) {
      return requestRef.current;
    }

    setLoading(true);
    setError(null);

    requestRef.current = api
      .getProducts()
      .then((data) => {
        setProducts(data);
        return data;
      })
      .catch((error) => {
        setError('Failed to load phones');
        requestRef.current = null;
        throw error;
      })
      .finally(() => {
        setLoading(false);
      });

    return requestRef.current;
  }, [products]);

  return (
    
    <ProductsContext.Provider
      value={{
        products: products,
        loading,
        error,
        loadProducts: loadProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('usePhones must be used inside PhonesProvider');
  }

  return context;
}
