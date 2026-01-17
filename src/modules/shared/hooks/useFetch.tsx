import { useCallback, useEffect, useState } from 'react';
import { FetchOptions } from '../../../types/FetchOptions';

interface Options<T> {
  initialValue: T;
  dependency?: any[];
}

export function useFetch<T>(
  callback: (options: FetchOptions) => Promise<T>,
  { initialValue, dependency = [] }: Options<T>,
) {
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetch = useCallback(
    async (options: FetchOptions = {}) => {
      try {
        setLoading(true);
        setError('');

        const fetchedData = await callback(options);

        if (options.signal?.aborted) {
          return;
        }

        setData(fetchedData);
      } catch (e: any) {
        if (e.name === 'AbortError') {
          return;
        }

        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('Something went wrong');
        }
      } finally {
        if (!options.signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [callback],
  );

  //eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const controller = new AbortController();

    handleFetch({
      signal: controller.signal,
    });

    return () => {
      controller.abort();
    };
  }, dependency);

  return {
    data,
    loading,
    error,
    handleFetch,
  };
}
