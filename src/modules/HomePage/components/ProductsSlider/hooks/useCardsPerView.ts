import { useEffect, useRef, useState } from 'react';

export const useCardsPerView = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const [countSlide, setCountSlide] = useState(1);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const viewportWidth = entry.contentRect.width;
      const width = firstCardRef.current?.offsetWidth ?? 0;

      setCardWidth(width);
      setCountSlide(Math.max(1, Math.floor(viewportWidth / width)));
    });

    const viewportElement = viewportRef.current;

    if (!viewportElement) {
      return;
    }

    observer.observe(viewportElement);

    return () => observer.disconnect();
  }, []);

  return { viewportRef, firstCardRef, countSlide, cardWidth };
};
