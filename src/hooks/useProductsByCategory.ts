import { useCallback, useEffect, useState } from 'react';
import { Category } from '../types/Category';
import { Product } from '../types/Product';
import { getProductsByCategory } from '../utils/client';

export const useProductsByCategory = (category: Category) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);
    setHasError(false);
    setProducts([]);

    getProductsByCategory(category)
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
  }, [category, attempt]);

  const reload = useCallback(() => setAttempt(current => current + 1), []);

  return { products, isLoading, hasError, reload };
};
