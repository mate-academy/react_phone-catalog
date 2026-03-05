import { useState, useEffect, useCallback } from 'react';
import { BANNERS } from '../constants/banners';
import { AUTOPLAY_INTERVAL_MS } from '../constants/sliderConfig';

const TOTAL_SLIDES = BANNERS.length;

const normalizeIndex = (index: number) =>
  ((index % TOTAL_SLIDES) + TOTAL_SLIDES) % TOTAL_SLIDES;

export const useSlider = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleGoToSlide = useCallback((index: number) => {
    setCurrentSlideIndex(normalizeIndex(index));
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlideIndex((previous) => normalizeIndex(previous + 1));
  }, []);

  const handlePreviousSlide = useCallback(() => {
    setCurrentSlideIndex((previous) => normalizeIndex(previous - 1));
  }, []);

  useEffect(() => {
    const interval = setInterval(handleNextSlide, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [handleNextSlide]);

  return {
    currentSlideIndex,
    handleGoToSlide,
    handleNextSlide,
    handlePreviousSlide,
  };
};
