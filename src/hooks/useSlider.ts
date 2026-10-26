import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSlider = (sliderLength: number) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const startX = useRef(0);
  const navigate = useNavigate();

  const showSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  const showNextSlide = () => {
    if (currentSlide === sliderLength - 1) {
      setCurrentSlide(0);

      return;
    }

    setCurrentSlide(currentSlide + 1);
  };

  const showPreviousSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(sliderLength - 1);

      return;
    }

    setCurrentSlide(currentSlide - 1);
  };

  const handleSwipe = (event: React.PointerEvent<HTMLElement>, to?: string) => {
    if (event.type === 'pointerdown') {
      startX.current = event.clientX;

      event.currentTarget.setPointerCapture(event.pointerId);

      return;
    }

    const distance = event.clientX - startX.current;

    if (distance <= -50) {
      showNextSlide();

      return;
    }

    if (distance >= 50) {
      showPreviousSlide();

      return;
    }

    if (Math.abs(distance) <= 10 && to) {
      navigate(to);
    }
  };

  return {
    currentSlide,
    showNextSlide,
    showPreviousSlide,
    showSlide,
    handleSwipe,
  };
};
