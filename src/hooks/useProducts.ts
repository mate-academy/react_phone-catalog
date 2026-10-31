import { useEffect, useState } from 'react';

import type { Product } from '../types/Product';
import { getProductsByCategory } from '../services/productService';

export const useProducts = (category: Product['category']) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    setIsLoading(true);
    setError(null);

    getProductsByCategory(category)
      .then(data => {
        if (isActive) {
          setProducts(data);
        }
      })
      .catch(() => {
        if (isActive) {
          setError('Не вдалося завантажити товари');
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [category]);

  return { products, isLoading, error };
};
