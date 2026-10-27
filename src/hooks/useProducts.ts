import { useCallback, useEffect, useState } from 'react';

import { getCachedProducts, getProducts } from '../services/products';

import type { Product } from '../types/Product';
import type { Category } from '../types/Category';

export const useProducts = (category: Category) => {
  const getInitialProducts = () => {
    const cached = getCachedProducts();

    return cached
      ? cached.filter(product => product.category === category)
      : [];
  };

  const [products, setProducts] = useState<Product[]>(getInitialProducts);
  const [isLoading, setIsLoading] = useState(
    () => getCachedProducts() === null,
  );
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => {
    setReloadKey(value => value + 1);
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const cached = getCachedProducts();

    if (cached) {
      setProducts(cached.filter(product => product.category === category));
      setIsLoading(false);
      setError(false);

      return;
    }

    setIsLoading(true);
    setError(false);

    getProducts()
      .then(data => {
        if (!isCancelled) {
          setProducts(data.filter(product => product.category === category));
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setError(true);
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
  }, [category, reloadKey]);

  return { products, isLoading, error, reload };
};
