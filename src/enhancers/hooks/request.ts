import { useEffect, useState } from "react";

type RequestReturn<T> = [
  data: T | null,
  loading: boolean,
  error: string,
  setData: React.Dispatch<React.SetStateAction<T | null>>
];

export function useRequest<T>(
  getData: () => Promise<T>,
  initialState: T | null = null,
  deps: unknown[] = [],
  thenCallback: (data: T) => void = () => {}
): RequestReturn<T> {
  const [data, setData] = useState<T | null>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    setIsLoading(true);

    getData()
      .then((data) => {
        setData(data);
        thenCallback(data)
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, deps);

  return [data, isLoading, error, setData];
};