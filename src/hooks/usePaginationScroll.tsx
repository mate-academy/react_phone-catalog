import { useRef } from 'react';

export const usePaginationScroll = () => {
  const catalogRef = useRef<HTMLDivElement>(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return {
    catalogRef,
    scrollToCatalog,
  };
};
