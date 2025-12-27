import { useEffect, useState } from 'react';

interface Options<T> {
  initialValue: T;
  dependency?: any[];
}

export function useFetch<T>(
  callback: () => Promise<T>,
  { initialValue, dependency = [] }: Options<T>,
) {
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    try {
      setLoading(true);
      setError('');

      const fetchedData = await callback();

      setData(fetchedData);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  //eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    handleFetch();
  }, dependency);

  return {
    data,
    loading,
    error,
    handleFetch,
  };
}
