import { useCallback, useEffect, useState } from 'react';

type UseSliderOptions = {
  itemCount: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
};

export const useSlider = ({
  itemCount,
  autoPlay = false,
  autoPlayInterval = 5000,
}: UseSliderOptions) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex: number) => (prevIndex + 1) % itemCount);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, itemCount]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(
      (prevIndex: number) => (prevIndex - 1 + itemCount) % itemCount,
    );
  }, [itemCount]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex: number) => (prevIndex + 1) % itemCount);
  }, [itemCount]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return {
    currentIndex,
    handlePrev,
    handleNext,
    goToIndex,
  };
};
