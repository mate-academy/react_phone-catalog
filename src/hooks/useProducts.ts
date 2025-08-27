import { useEffect, useState } from 'react';
import { Product } from '../types/Product';

export const useProducts = (category: 'phones' | 'tablets' | 'accessories') => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`./api/${category}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        return response.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [category]);

  return { products, loading, error };
};
