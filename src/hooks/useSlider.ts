import { useState, useRef, useCallback, useEffect, RefObject } from 'react';

const SCROLL_STEPS = { mobile: 228, tablet: 253, desktop: 288 };

interface UseSliderReturn {
  listRef: RefObject<HTMLDivElement>;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  scroll: (direction: 'left' | 'right') => void;
  checkScrollPosition: () => void;
}

export const useSlider = <T>(dependency: T): UseSliderReturn => {
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const listRef = useRef<HTMLDivElement>(null);

  const checkScrollPosition = useCallback(() => {
    if (listRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = listRef.current;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(checkScrollPosition, 50);

    window.addEventListener('resize', checkScrollPosition);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [checkScrollPosition, dependency]);

  const getScrollStep = useCallback(() => {
    if (window.innerWidth < 640) {
      return SCROLL_STEPS.mobile;
    }

    if (window.innerWidth < 1200) {
      return SCROLL_STEPS.tablet;
    }

    return SCROLL_STEPS.desktop;
  }, []);

  const scroll = useCallback(
    (direction: 'left' | 'right') => {
      if (!listRef.current) {
        return;
      }

      listRef.current.scrollBy({
        left: direction === 'left' ? -getScrollStep() : getScrollStep(),
        behavior: 'smooth',
      });
    },
    [getScrollStep],
  );

  return {
    listRef,
    canScrollLeft,
    canScrollRight,
    scroll,
    checkScrollPosition,
  };
};
