import { useEffect, useRef, useState } from 'react';

type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: boolean;
};

export function useAsync<T>(loader: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: false,
  });
  const loaderRef = useRef(loader);

  useEffect(() => {
    loaderRef.current = loader;
  }, [loader]);

  useEffect(() => {
    let cancelled = false;

    setState({ data: null, loading: true, error: false });

    loaderRef
      .current()
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
