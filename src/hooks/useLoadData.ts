import { useCallback, useEffect, useState } from 'react';

type UseLoadDataResult<T> = {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

export function useLoadData<T>(
  fetchFn: () => Promise<T>,
  deps: unknown[] = [],
): UseLoadDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const load = useCallback(() => {
    setIsLoading(true);
    setIsError(false);

    fetchFn()
      .then(setData)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [fetchFn]);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load, ...deps]);

  return { data, isLoading, isError, refetch: load };
}
