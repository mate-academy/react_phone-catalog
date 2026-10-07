import React, { useEffect, useMemo, useState } from 'react';
import { Product } from '../../types/products';
import { getProducts } from '../../api';

interface ProductsContextType {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

export const ProductsContext = React.createContext<ProductsContextType>({
  products: [],
  isLoading: false,
  error: null,
});

interface Props {
  children: React.ReactNode;
}

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getProducts()
      .then(data => {
        if (isMounted) {
          setProducts(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Failed to load products');
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      products,
      isLoading,
      error,
    }),
    [products, isLoading, error],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
