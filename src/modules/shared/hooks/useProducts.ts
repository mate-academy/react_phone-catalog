import { useEffect, useState, useCallback } from 'react';
import { Product } from '../types/Product';

type UseProductsResult = {
  products: Product[];
  isLoading: boolean;
  hasError: boolean;
  reload: () => void;
};

export const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadProducts = useCallback(() => {
    setIsLoading(true);
    setHasError(false);

    fetch('/api/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        return response.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return { products, isLoading, hasError, reload: loadProducts };
};
