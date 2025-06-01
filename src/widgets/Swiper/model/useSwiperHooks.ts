import { useCallback, useEffect, useState, useRef } from 'react';

const wrapIndex = (index: number, total: number) => (index + total) % total;

export const useSwiper = (total: number) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pause, setPause] = useState(false);
  const startX = useRef<number | null>(null);

  const next = useCallback(() => {
    setActiveIndex(prev => wrapIndex(prev + 1, total));
  }, [total]);

  const prev = useCallback(() => {
    setActiveIndex(pre => wrapIndex(pre - 1, total));
  }, [total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) {
      return;
    }

    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX.current;

    if (Math.abs(diff) > 30) {
      if (diff < 0) {
        next();
      } else {
        prev();
      }
    }

    startX.current = null;
  };

  useEffect(() => {
    if (pause) {
      return;
    }

    const interval = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(interval);
  }, [next, pause]);

  return {
    activeIndex,
    next,
    prev,
    setPause,
    handleTouchStart,
    handleTouchEnd,
  };
};
