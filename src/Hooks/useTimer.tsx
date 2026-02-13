import { useRef, useEffect, useCallback } from 'react';

export const useTimer = () => {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback(
    (callback: () => void, delay: number) => {
      clear();

      const id = setTimeout(() => {
        callback();
        timerRef.current = null;
      }, delay);

      timerRef.current = id;
    },
    [clear],
  );

  useEffect(() => {
    return () => clear();
  }, [clear]);

  return { start, clear };
};
