import { useEffect, useRef, useState } from 'react';

const useScrollButtons = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const isAbleToScrollLeft = scrollRef.current.scrollLeft > 0;
      const isAbleToScrollRight =
        scrollRef.current.scrollLeft <
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

      setCanScrollLeft(isAbleToScrollLeft);
      setCanScrollRight(isAbleToScrollRight);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;

    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', updateScrollButtons);
      }
    };
  }, []);

  const getScrollAmount = (pos: 'left' | 'right') => {
    if (window.innerWidth >= 1200) {
      return pos === 'left' ? -1152 : 1152;
    } else if (window.innerWidth >= 640) {
      return pos === 'left' ? -508 : 508;
    } else {
      return pos === 'left' ? -229 : 229;
    }
  };

  const handleScrollLeft = () => {
    if (scrollRef.current && canScrollLeft) {
      scrollRef.current.scrollBy({
        left: getScrollAmount('left'),
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current && canScrollRight) {
      scrollRef.current.scrollBy({
        left: getScrollAmount('right'),
        behavior: 'smooth',
      });
    }
  };

  return {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    handleScrollLeft,
    handleScrollRight,
  };
};

export default useScrollButtons;
