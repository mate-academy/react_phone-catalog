import { useEffect, useState } from "react";

type RequestReturn<T> = [data: T | null, loading: boolean, error: string];

export function useRequest<T>(
  getData: () => Promise<T>,
  initialState: T | null = null,
  deps: unknown[] = [],
): RequestReturn<T> {
  const [data, setData] = useState<T | null>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    setIsLoading(true);

    getData()
      .then(setData)
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, deps);

  return [data, isLoading, error];
};