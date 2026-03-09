import { useState, useEffect } from 'react';
import { Product } from '../../../../types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}api/products.json`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }

        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
};
