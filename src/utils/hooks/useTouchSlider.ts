import { useRef } from 'react';

export const useTouchSlider = (
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
) => {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      onSwipeLeft();
    } else if (touchStartX.current - touchEndX.current < -50) {
      onSwipeRight();
    }
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
