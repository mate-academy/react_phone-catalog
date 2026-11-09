import { useRef } from 'react';

export const useSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const container = sliderRef.current;

    if (!container) {
      return;
    }

    const firstItem = container.firstElementChild as HTMLElement | null;

    if (!firstItem) {
      return;
    }

    const itemWidth = firstItem.getBoundingClientRect().width;

    const { columnGap } = window.getComputedStyle(container);
    const gap = parseFloat(columnGap) || 0;

    const offset = direction === 'left' ? -(itemWidth + gap) : itemWidth + gap;

    container.scrollBy({
      left: offset,
      behavior: 'smooth',
    });
  };

  return {
    sliderRef,
    prev: () => scroll('left'),
    next: () => scroll('right'),
  };
};
