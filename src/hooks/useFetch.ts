import { useEffect, useState } from 'react';

type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: boolean;
};

export function useFetch<T>(
  fetcher: () => Promise<T>,
  deps: React.DependencyList,
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    let cancelled = false;

    setState(prev => ({ ...prev, loading: true, error: false }));

    fetcher()
      .then(data => {
        if (!cancelled) {
          setState({ data, loading: false, error: false });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState({ data: null, loading: false, error: true });
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
