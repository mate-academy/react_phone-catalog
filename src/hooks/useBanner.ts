import { useEffect, useState, useCallback } from 'react';

export const useSlider = (length: number, delay = 5000) => {
  const [index, setIndex] = useState(0);

  const next = useCallback(
    () => setIndex(prev => (prev + 1) % length),
    [length],
  );

  const prev = useCallback(
    () => setIndex(current => (current - 1 + length) % length),
    [length],
  );

  const goTo = useCallback((i: number) => setIndex(i), []);

  useEffect(() => {
    const id = setInterval(next, delay);

    return () => clearInterval(id);
  }, [next, delay]);

  return { index, next, prev, goTo };
};
