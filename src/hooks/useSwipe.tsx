import { useState } from 'react';

type Callback = (i: number) => void;

export const useSwipe = (
  callback: Callback,
  edge: number,
) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent, i: number) => {
    if (touchStart === null) {
      return;
    }

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 0) {
      if (i === edge) {
        return;
      }

      callback(i + 1);
    }

    if (diff < 0) {
      if (i === 0) {
        return;
      }

      callback(i - 1);
    }

    setTouchStart(null);
  };

  return {
    handleTouchStart,
    handleTouchMove,
  };
};
