import { useState, useEffect } from 'react';
import { Product } from '../../../../types';

const BASE = import.meta.env.DEV ? '/' : '/react_phone-catalog/';

export const useProductsByCategory = (category: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch(`${BASE}api/products.json`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }

        return res.json();
      })
      .then((data: Product[]) => {
        const filtered = data.filter(p => p.category === category);

        setProducts(filtered);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [category]);

  return { products, loading, error };
};
