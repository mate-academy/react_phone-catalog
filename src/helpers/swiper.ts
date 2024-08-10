import { useState } from 'react';
type Callback = (index: number) => void;

export const Swiper = (callback: Callback, edge: number) => {
  const [startX, setStartX] = useState<number | null>(null);

  const handleTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];

    setStartX(touch.clientX);
  };

  const handleTouchMove = (event: React.TouchEvent, currentIndex: number) => {
    if (!startX) {
      return;
    }

    const touch = event.changedTouches[0];
    const endX = touch.clientX;
    const diff = startX - endX;

    if (diff > 0 && currentIndex < edge) {
      callback(currentIndex + 1);
    }

    if (diff < 0 && currentIndex > 0) {
      callback(currentIndex - 1);
    }

    setStartX(null);
  };

  return {
    handleTouchStart,
    handleTouchMove,
  };
};
