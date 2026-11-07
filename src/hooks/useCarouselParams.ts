import { useEffect, useState } from 'react';
import type { CarouselConfig } from '../types/carouselConfig';
import { BREAKPOINTS } from '../constants/breakpoints';

export const useCarouselParams = (paramsConfig: CarouselConfig) => {
  const [carouselParams, setCarouselParams] = useState(paramsConfig.mobile);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < BREAKPOINTS.md) {
        setCarouselParams(paramsConfig.mobile);
      } else if (width < BREAKPOINTS.lg) {
        setCarouselParams(paramsConfig.tablet || paramsConfig.mobile);
      } else {
        setCarouselParams(paramsConfig.desktop || paramsConfig.mobile);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [paramsConfig]);

  return carouselParams;
};
