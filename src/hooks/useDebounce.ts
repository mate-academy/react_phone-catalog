import { useEffect, DependencyList } from 'react';

type DebounceCallback = () => void;

export default function useDebounce(
  callback: DebounceCallback,
  delay: number,
  dependencies: DependencyList,
) {
  let timerId: NodeJS.Timeout | null = null;

  useEffect(() => {
    const debouncedCallback = () => {
      if (timerId) {
        clearTimeout(timerId);
      }

      timerId = setTimeout(() => {
        callback();
      }, delay);
    };

    debouncedCallback();

    return () => {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
    };
  }, [...dependencies, callback, delay]);

  const debounceReset = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  return { debounceReset };
}
