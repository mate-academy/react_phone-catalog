import { useState } from 'react';

export const useSwipe = (itemsLength: number) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const [startTouch, setStartTouch] = useState<number | null>(null);
  const followingSlide = 1;
  const startSlide = 0;

  const startSwipe = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 0) {
      setStartTouch(e.touches[0].clientX);
    }
  };

  const endSwipe = (e: React.TouchEvent<HTMLDivElement>) => {
    const endTouch = e.changedTouches[0].clientX;
    const difference = (startTouch || 0) - endTouch;
    const distanceSwipe = 50;

    if (difference >= distanceSwipe) {
      setScrollIndex(prev =>
        prev < itemsLength - followingSlide
          ? prev + followingSlide
          : startSlide,
      );
    } else if (difference <= -distanceSwipe) {
      setScrollIndex(prev =>
        prev > startSlide
          ? prev - followingSlide
          : itemsLength - followingSlide,
      );
    }

    setStartTouch(null);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setScrollIndex(prev =>
        prev + followingSlide < itemsLength
          ? prev + followingSlide
          : startSlide,
      );
    }

    if (direction === 'left') {
      setScrollIndex(prev =>
        prev - followingSlide > startSlide
          ? prev - followingSlide
          : itemsLength - followingSlide,
      );
    }
  };

  return { startSwipe, endSwipe, scroll, scrollIndex };
};
