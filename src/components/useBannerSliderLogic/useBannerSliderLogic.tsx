import { useEffect, useRef, useState, useCallback } from 'react';

export const useBannerSliderLogic = (imagesLength: number) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback(
    (i: number) => {
      const safeIndex = (i + imagesLength) % imagesLength;

      setActiveIndex(safeIndex);

      if (sliderRef.current) {
        const width = sliderRef.current.offsetWidth;

        sliderRef.current.scrollTo({
          left: safeIndex * width,
          behavior: 'smooth',
        });
      }
    },
    [imagesLength],
  );

  const handleScroll = () => {
    if (!sliderRef.current) {
      return;
    }

    const scrollLeft = sliderRef.current.scrollLeft;
    const width = sliderRef.current.offsetWidth;
    const index = Math.round(scrollLeft / width);

    setActiveIndex(index);
  };

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    slider.addEventListener('scroll', handleScroll);

    return () => slider.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollToIndex(activeIndex + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, scrollToIndex]);

  return { sliderRef, activeIndex, scrollToIndex };
};
