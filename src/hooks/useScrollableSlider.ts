import { useEffect, useRef, useState } from 'react';
import { Product } from '../types/Product';

export const useScrollableSlider = (deps: Product[] = []) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const checkScrollPosition = () => {
    const el = sliderRef.current;

    if (!el) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setIsAtStart(scrollLeft <= 0);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
  };

  useEffect(() => {
    if (deps.length > 0) {
      requestAnimationFrame(() => {
        checkScrollPosition();
      });
    }
  }, [deps]);

  useEffect(() => {
    const el = sliderRef.current;

    if (!el) {
      return;
    }

    el.addEventListener('scroll', checkScrollPosition);
    checkScrollPosition();

    return () => el.removeEventListener('scroll', checkScrollPosition);
  }, []);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return {
    sliderRef,
    isAtStart,
    isAtEnd,
    scrollLeft,
    scrollRight,
  };
};
