import { useCallback, useEffect, useState } from 'react';

type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

type UseAsyncResult<T> = AsyncState<T> & {
  reload: () => void;
};

export const useAsync = <T>(asyncFn: () => Promise<T>): UseAsyncResult<T> => {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => setReloadKey(k => k + 1), []);

  useEffect(() => {
    let cancelled = false;

    setState(s => ({ ...s, loading: true, error: null }));

    asyncFn()
      .then(data => {
        if (!cancelled) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : 'Something went wrong';

          setState({ data: null, loading: false, error: message });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [asyncFn, reloadKey]);

  return { ...state, reload };
};
