import { useRef } from 'react';

type Options = {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  threshold?: number;
};

export const useSwipe = ({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
}: Options) => {
  const startX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) {
      return;
    }

    const diff = startX.current - e.changedTouches[0].clientX;

    if (diff > threshold) {
      onSwipeLeft();
    } else if (diff < -threshold) {
      onSwipeRight();
    }

    startX.current = null;
  };

  return { handleTouchStart, handleTouchEnd };
};
