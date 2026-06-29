import { useCallback } from 'react';
import { useSwipe } from './useSwipe';

type Params = {
  currentIndex: number;
  totalItems: number;
  onChange: (index: number) => void;
  swipeThresholdPx: number;
};

export const useCarousel = ({
  currentIndex,
  totalItems,
  onChange,
  swipeThresholdPx,
}: Params) => {
  const lastIndex = totalItems - 1;

  const goNext = useCallback(() => {
    const nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;

    onChange(nextIndex);
  }, [currentIndex, lastIndex, onChange]);

  const goPrev = useCallback(() => {
    const prevIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;

    onChange(prevIndex);
  }, [currentIndex, lastIndex, onChange]);

  const swipeHandlers = useSwipe({
    thresholdPx: swipeThresholdPx,
    onSwipeLeft: goNext,
    onSwipeRight: goPrev,
  });

  return {
    goNext,
    goPrev,
    swipeHandlers,
  };
};
