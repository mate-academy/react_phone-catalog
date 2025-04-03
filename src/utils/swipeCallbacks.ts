import { useState } from 'react';

type SwipeCallbacks = {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
};

export const useSwipe = ({ onSwipeLeft, onSwipeRight }: SwipeCallbacks) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) {
      return;
    }

    const distance = touchStartX - touchEndX;

    if (distance > minSwipeDistance) {
      onSwipeLeft();
    }

    if (distance < -minSwipeDistance) {
      onSwipeRight();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
