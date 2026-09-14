import { createContext, useContext, useEffect, useState } from 'react';
import {
  getProductCatalog,
  type ProductCatalog,
} from '../repositories/productRepository';

type ProductsContextValue = ProductCatalog & {
  loading: boolean;
  error: Error | null;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [catalog, setCatalog] = useState<ProductCatalog>({
    products: [],
    details: { phones: [], tablets: [], accessories: [] },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getProductCatalog()
      .then(setCatalog)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProductsContext.Provider value={{ ...catalog, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used inside ProductsProvider');
  }

  return context;
};
