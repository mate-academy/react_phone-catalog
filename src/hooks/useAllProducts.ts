// hooks/useAllProducts.ts
import { useEffect, useState } from 'react';
import { Product } from '../types/Product';

export const useAllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('./api/products.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch all products');
        }

        return res.json();
      })
      .then(setProducts)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
};
