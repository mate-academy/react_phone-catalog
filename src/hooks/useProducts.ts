import { useEffect, useState } from 'react';
import { getProducts } from '../api/products';
import { Product } from '../types/Product';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError(false);
    getProducts()
      .then(data => {
        if (active) {
          setProducts(data);
        }
      })
      .catch(() => {
        if (active) {
          setError(true);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [attempt]);

  return {
    products,
    loading,
    error,
    reload: () => setAttempt(value => value + 1),
  };
};
