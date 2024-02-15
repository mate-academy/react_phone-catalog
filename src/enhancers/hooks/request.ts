import { useEffect, useState } from 'react';

type RequestReturn<T, Initial> = [
  data: T | Initial,
  loading: boolean,
  error: string,
  setData: React.Dispatch<React.SetStateAction<T | Initial>>,
];

export function useRequest<T, Initial>(
  getData: () => Promise<T>,
  deps: unknown[] = [],
  initialState: Initial,
  thenCallback: (data: T) => void = () => {},
): RequestReturn<T, Initial> {
  const [data, setData] = useState<T | Initial>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    setIsLoading(true);

    let ignoreResponse = false;

    getData()
      .then((data) => {
        if (!ignoreResponse) {
          setData(data);
          thenCallback(data);
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));

    return () => {
      ignoreResponse = true;
    };
  }, deps);

  return [data, isLoading, error, setData];
}
