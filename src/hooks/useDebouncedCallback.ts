import { useCallback, useEffect, useRef } from 'react';

export function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number,
) {
  const timerId = useRef<number>();
  const latestCallback = useRef(callback);

  latestCallback.current = callback;

  useEffect(() => () => window.clearTimeout(timerId.current), []);

  return useCallback(
    (...args: Args) => {
      window.clearTimeout(timerId.current);

      timerId.current = window.setTimeout(
        () => latestCallback.current(...args),
        delay,
      );
    },
    [delay],
  );
}
