import { useCallback, useEffect, useRef, useState } from 'react';

export const useSlider = (length: number, intervalTime = 5000, auto = true) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const next = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % length);
  }, [length]);

  const previus = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + length) % length);
  }, [length]);

  const goTo = useCallback((ind: number) => {
    setCurrentIndex(ind);
  }, []);

  const resetInterval = useCallback(() => {
    if (!auto) {
      return;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current!);
    }

    intervalRef.current = setInterval(() => {
      next();
    }, intervalTime);
  }, [next, intervalTime, auto]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(intervalRef.current!);
  }, [next]);

  return { currentIndex, resetInterval, goTo, previus, next };
};

export default useSlider;
