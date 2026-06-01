import { useEffect, useRef, useState } from 'react';

type State<T> = {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
};

export function useAsync<T>(asyncFn: () => Promise<T>, deps: unknown[] = []) {
  const asyncFnRef = useRef(asyncFn);

  asyncFnRef.current = asyncFn;

  const [state, setState] = useState<State<T>>({
    data: null,
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    setState({ data: null, isLoading: true, isError: false });

    const timeout = setTimeout(() => {
      setState({ data: null, isLoading: false, isError: true });
    }, 10000);

    asyncFnRef
      .current()
      .then(data => setState({ data, isLoading: false, isError: false }))
      .catch(() => setState({ data: null, isLoading: false, isError: true }))
      .finally(() => clearTimeout(timeout));

    return () => clearTimeout(timeout);
  }, deps);

  return state;
}
