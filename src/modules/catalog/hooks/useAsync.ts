// src/modules/catalog/hooks/useAsync.ts - Custom hook for handling async operations
import { useCallback, useState } from 'react';

export function useAsync<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const run = useCallback(async (p: Promise<T>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await p;

      setData(res);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, run };
}
