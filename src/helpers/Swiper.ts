import React, { useState } from 'react';

type Callback = (index: number) => void;

export const Swiper = (callback: Callback, edge: number) => {
  const [startX, setStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];

    setStartX(touch.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent, currentIndex: number) => {
    if(!startX) {
      return;
    }

    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const diff = startX - endX;

    if (diff > 0 && currentIndex < edge) {
      callback(currentIndex - 1);
    }

    setStartX(null);
  };

  return {
    handleTouchStart,
    handleTouchMove,
  };
};
