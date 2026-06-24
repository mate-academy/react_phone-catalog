import { useEffect, useState } from 'react';

type UseProductsResult<T> = {
  products: T[];
  loading: boolean;
  error: string | null;
};

export function useProducts<T>(filePath = 'products'): UseProductsResult<T> {
  const url = new URL(
    `api/${filePath}.json`,
    window.location.origin + import.meta.env.BASE_URL,
  ).toString();

  const [products, setProducts] = useState<T[]>([]);
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
  }, [url]);

  return {
    products,
    loading,
    error,
  };
}
