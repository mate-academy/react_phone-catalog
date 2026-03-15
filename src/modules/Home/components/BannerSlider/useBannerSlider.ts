import { useState, useEffect, useCallback } from 'react';

export const useBannerSlider = (length: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % length);
  }, [length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + length) % length);
  }, [length]);

  useEffect(() => {
    if (length <= 1) {
      return;
    }

    const interval = setInterval(handleNext, 5000);

    return () => clearInterval(interval);
  }, [handleNext, currentIndex, length]);

  return {
    currentIndex,
    setCurrentIndex,
    handleNext,
    handlePrev,
  };
};
