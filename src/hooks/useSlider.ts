import { useEffect, useRef, useState } from 'react';

import { DEFAULT_VALUE, TIME_SLIDER } from '../constants/default-values';
import { SliderSettings } from '../types/SliderSettings';

export const useSlider = (settings: SliderSettings) => {
  const [currentIndex, setCurrentIndex] = useState(DEFAULT_VALUE);
  const timeout = useRef(0);

  useEffect(() => {
    if (settings.autoplay) {
      timeout.current = window.setTimeout(() => {
        if (currentIndex < settings.total) {
          setCurrentIndex(currentIndex + settings.step);
        }
      }, TIME_SLIDER);
    }
  }, [currentIndex, settings.total]);

  useEffect(() => {
    if (settings.isFullScroll) {
      if (currentIndex === settings.total) {
        setCurrentIndex(DEFAULT_VALUE);
        clearTimeout(timeout.current);
      }
    }
  }, [currentIndex, settings.total, settings.isFullScroll]);

  const handleNextSlide = () => {
    clearTimeout(timeout.current);

    if (currentIndex < settings.total) {
      setCurrentIndex(currentIndex + settings.step);
    }
  };

  const handlePrevSlide = () => {
    clearTimeout(timeout.current);

    if (currentIndex > DEFAULT_VALUE) {
      setCurrentIndex(currentIndex - settings.step);
    }
  };

  return { handlePrevSlide, handleNextSlide, currentIndex };
};
