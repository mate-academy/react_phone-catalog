import { useState, useEffect, useRef } from 'react';

export const useCrossFade = <T>(value: T | null, duration = 500) => {
  const [current, setCurrent] = useState<T | null>(value);
  const [previous, setPrevious] = useState<T | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const previousValueRef = useRef<T | null>(value);

  useEffect(() => {
    if (!value || value === previousValueRef.current) {
      return;
    }

    setPrevious(previousValueRef.current);
    setCurrent(value);

    previousValueRef.current = value;

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setPrevious(null);
    }, duration);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [value, duration]);

  return { current, previous, isTransitioning: !!previous };
};
