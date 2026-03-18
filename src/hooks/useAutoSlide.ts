import { useEffect } from 'react';

type Params = {
  currentSlide: number;
  totalSlides: number;
  delayMs: number;
  onNext: () => void;
};

export const useAutoSlide = ({
  currentSlide,
  totalSlides,
  delayMs,
  onNext,
}: Params) => {
  useEffect(() => {
    if (totalSlides <= 1) {
      return;
    }

    const timerId = setTimeout(onNext, delayMs);

    return () => clearTimeout(timerId);
  }, [currentSlide, totalSlides, delayMs, onNext]);
};
