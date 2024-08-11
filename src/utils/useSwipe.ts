import { useState, useCallback } from 'react';

type SwipeHandler = () => void;

export const useSwipe = (
  onLeftSwipe: SwipeHandler,
  onRightSwipe: SwipeHandler,
) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (touchStart === null || touchEnd === null) {
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onLeftSwipe();
    } else if (isRightSwipe) {
      onRightSwipe();
    }
  }, [touchStart, touchEnd, onLeftSwipe, onRightSwipe]);

  return { onTouchStart, onTouchMove, onTouchEnd };
};
