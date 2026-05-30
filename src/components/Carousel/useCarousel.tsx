import { useEffect, useRef, useState } from 'react';

export const useCarousel = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    if (!contentRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = contentRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  const scrollContent = (direction: 'left' | 'right') => {
    if (!contentRef.current) {
      return;
    }

    const scrollAmount =
      direction === 'left'
        ? -contentRef.current.clientWidth
        : contentRef.current.clientWidth;

    contentRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  useEffect(() => {
    updateScrollButtons();

    const content = contentRef.current;

    if (content) {
      content.addEventListener('scroll', updateScrollButtons);

      return () => content.removeEventListener('scroll', updateScrollButtons);
    }

    return undefined;
  }, []);

  return {
    contentRef,
    canScrollLeft,
    canScrollRight,
    scrollContent,
  };
};
