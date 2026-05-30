import { useRef, useState } from 'react';

const STEP = 1;
const VISIBLE_CARDS = 4;

export const useSlider = (itemCount: number) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const maxSlide = Math.max(0, itemCount - VISIBLE_CARDS);

  const getCardWidth = () => {
    if (!sliderRef.current) {
      return 0;
    }

    const card = sliderRef.current.querySelector('[data-card]');

    return card ? card.getBoundingClientRect().width + 16 : 0;
  };

  const handlePrevSlide = () => {
    setCurrentSlide(prev => Math.max(0, prev - STEP));
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => Math.min(maxSlide, prev + STEP));
  };

  const translateValue = currentSlide * getCardWidth();

  return {
    currentSlide,
    sliderRef,
    maxSlide,
    handlePrevSlide,
    handleNextSlide,
    translateValue,
  };
};
