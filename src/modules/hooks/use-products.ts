import { useEffect, useState } from 'react';
import { BaseProduct } from '../../types';

type UseProductsResult = {
  products: BaseProduct[];
  loading: boolean;
  error: string | null;
};

export function useProducts(): UseProductsResult {
  const url = new URL(
    'api/products.json',
    window.location.origin + import.meta.env.BASE_URL,
  ).toString();

  const [products, setProducts] = useState<BaseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        return res.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err.message ?? 'Unknown error');
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return {
    products,
    loading,
    error,
  };
}
