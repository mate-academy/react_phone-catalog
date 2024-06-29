import { useCallback, useRef } from 'react';

export const useDebounce = <T extends any[]>(
  fn: (...args: T) => void,
  delay: number,
) => {
  const ref = useRef(fn);
  const timer = useRef<NodeJS.Timer>();

  ref.current = fn;

  const debounced = useCallback(
    (...args: T) => {
      clearTimeout(timer.current);

      timer.current = setTimeout(() => ref.current(...args), delay);
    },
    [delay],
  );

  return debounced;
};
