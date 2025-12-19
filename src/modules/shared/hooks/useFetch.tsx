import { useEffect, useState } from 'react';

export function useFetch<T>(callback: () => Promise<T>, initialValue: T) {
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
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

    handleFetch();
  }, []);

  return {
    data,
    loading,
    error,
  };
}
