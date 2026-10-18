import { useCallback, useEffect, useState } from 'react';

export function useRequest<T>(request: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let isActual = true;

    setIsLoading(true);
    setHasError(false);

    request()
      .then(result => isActual && setData(result))
      .catch(() => isActual && setHasError(true))
      .finally(() => isActual && setIsLoading(false));

    return () => {
      isActual = false;
    };
  }, [request, attempt]);

  const reload = useCallback(() => setAttempt(current => current + 1), []);

  return { data, isLoading, hasError, reload };
}
