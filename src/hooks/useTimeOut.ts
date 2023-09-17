import { useCallback, useEffect, useRef } from 'react';

type TimeoutCallback = () => void;

interface UseTimeout {
  reset: () => void;
  clear: () => void;
}

// eslint-disable-next-line
export function useTimeout(callback: TimeoutCallback, delay: number): UseTimeout {
  const callbackRef = useRef<TimeoutCallback>(callback);
  const timeoutRef = useRef<number | undefined>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = window.setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    if (timeoutRef.current !== undefined) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }, []);

  useEffect(() => {
    set();

    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
}
