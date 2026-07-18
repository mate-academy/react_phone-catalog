import { useRef } from 'react';

export const useDebounce = (
  callback: (value: string) => void,
  delay: number,
) => {
  const timerId = useRef<NodeJS.Timeout>();

  return (args: string) => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    timerId.current = setTimeout(() => {
      callback(args);
    }, delay);
  };
};
