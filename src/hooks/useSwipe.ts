import { useRef } from 'react';

type Params = {
  thresholdPx: number;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
};

export const useSwipe = ({
  thresholdPx,
  onSwipeLeft,
  onSwipeRight,
}: Params) => {
  const startX = useRef<number | null>(null);

  const onTouchStart = (event: React.TouchEvent) => {
    startX.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (startX.current === null) {
      return;
    }

    const endX = event.changedTouches[0].clientX;
    const diff = startX.current - endX;

    if (Math.abs(diff) < thresholdPx) {
      return;
    }

    if (diff > 0) {
      onSwipeLeft();

      return;
    }

    onSwipeRight();
  };

  return {
    onTouchStart,
    onTouchEnd,
  };
};
