import { useState, useEffect } from 'react';
import { Product } from '../../../../types';

const BASE = import.meta.env.DEV ? '/' : '/react_phone-catalog/';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${BASE}api/products.json`)
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
