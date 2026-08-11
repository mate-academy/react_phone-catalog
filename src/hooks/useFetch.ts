import { useState, useEffect } from 'react';

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Не вдалося завантажити дані з сервера');
        }

        return response.json();
      })
      .then(fetchedData => {
        setData(fetchedData);
        setError(null);
      })
      .catch(err => {
        setError(err.message || 'Щось пішло не так');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}
