import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { withBase } from '../../utils/withBase';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadProducts = () => {
    setIsLoading(true);
    setHasError(false);

    fetch(withBase('api/products.json'))
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load products');
        }

        return response.json();
      })
      .then(setProducts)
      .catch(() => {
        setProducts([]);
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    isLoading,
    hasError,
    loadProducts,
  };
};
