import { useCallback, useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../utils/client';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);
    setHasError(false);

    getProducts()
      .then(data => {
        if (!isCancelled) {
          setProducts(data);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [attempt]);

  const reload = useCallback(() => setAttempt(current => current + 1), []);

  return { products, isLoading, hasError, reload };
};
