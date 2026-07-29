import { useEffect, useRef } from 'react';

export function useInterval(
  callback: () => void,
  delay: number | null,
  resetKey?: unknown,
) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return undefined;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- resetKey intentionally restarts the interval
  }, [delay, resetKey]);
}
