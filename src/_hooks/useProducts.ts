import { useState, useEffect, DependencyList } from 'react';

interface UseProductsReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useProducts = <T>(
  fetchFn: () => Promise<T>,
  errorMessage: string,
  dependencies: DependencyList = [],
): UseProductsReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await fetchFn();

        setData(result);
        setError(null);
      } catch {
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => fetchData(), 1000);
  }, dependencies);

  return { data, loading, error };
};
