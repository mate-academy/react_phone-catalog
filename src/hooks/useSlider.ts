import { useCallback, useState } from 'react';

export const useSlider = (length: number, infinite = false, countSlide = 1) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const maxSlide = Math.max(0, length - countSlide);

  const nextSlide = useCallback(() => {
    setCurrentSlide(current => {
      if (infinite) {
        return current === maxSlide ? 0 : current + 1;
      }

      return Math.min(current + 1, maxSlide);
    });
  }, [maxSlide, infinite]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(current => {
      if (infinite) {
        return current === 0 ? maxSlide : current - 1;
      }

      return Math.max(current - 1, 0);
    });
  }, [maxSlide, infinite]);

  const isFirst = currentSlide === 0;
  const isLast = currentSlide === maxSlide;

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    setCurrentSlide,
    isFirst,
    isLast,
  };
};
