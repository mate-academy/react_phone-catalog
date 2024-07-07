import { useEffect, useRef } from 'react';

type ArbFunction = (args?: any[]) => void;

const DELAY = 200;

export const useDebounce = (functionToExecute: ArbFunction, delay = DELAY) => {
  const timer = useRef(0);

  useEffect(() => {
    return () => {
      if (!timer.current) {
        return;
      }

      window.clearTimeout(timer.current);
    };
  }, []);

  const functionWithDebounce: ArbFunction = (...args) => {
    window.clearTimeout(timer.current);

    timer.current = window.setTimeout(() => {
      functionToExecute(args);
    }, delay);
  };

  return functionWithDebounce;
};
