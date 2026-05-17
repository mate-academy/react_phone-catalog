import { useEffect, useRef, useState } from 'react';
import { useDebounce } from './useDebounce';
import { initialSliderParams } from '../types/initialSliderParams';

export const useSlider = ({
  itemsCount,
  initialIndex = 0,
  loop = false,
  autoplay,
  draggable = false,
  breakpoints,
}: initialSliderParams) => {
  const [translateX, setTranslateX] = useState(0);
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [slidesPerView, setSlidesPerView] = useState<number>(1);
  const [maxIndex, setMaxIndex] = useState<number>(calcMaxIndex(itemsCount, 1));
  const [isPlaying, setIsPlaying] = useState<boolean>(!!autoplay?.enabled);

  const [width, setWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );
  const debouncedWidth = useDebounce(width, 200);

  const viewPortRef = useRef<HTMLDivElement | null>(null); // ширина
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeAutoPlayRef = useRef<number | null>(null);
  const currentIndexRef = useRef(currentIndex);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const isTransitionOnRef = useRef<boolean>(true);

  const isMovingRef = useRef<boolean>(false);
  const startXPointerRef = useRef<number>(0);
  const startYPointerRef = useRef<number>(0);
  const prevTranslateXRef = useRef<number>(0);
  const currTranslateXRef = useRef<number>(0);
  const preventClickRef = useRef<boolean>(false);

  const totalWrapperWidth = itemsCount * (debouncedWidth / slidesPerView);
  const maxTranslateX = 0;
  const minTranslateX = Math.min(0, debouncedWidth - totalWrapperWidth);

  const clamp = (v: number, min: number, max: number) => {
    return Math.max(min, Math.min(v, max));
  };

  const getSlidesPerView = (width: number): number => {
    if (!breakpoints || Object.keys(breakpoints).length === 0) return 1;

    const breakPoints: number[] = Object.keys(breakpoints)
      .map(w => Number(w))
      .sort((n1, n2) => n1 - n2);

    let currWidth: number | null = null;

    for (const key of breakPoints) {
      if (key <= width) {
        currWidth = key;
      } else {
        break;
      }
    }

    return currWidth !== null ? breakpoints[currWidth] : 1;
  };

  function calcMaxIndex(itemCount: number, slidesPerView: number) {
    return Math.max(0, Math.ceil(itemCount - slidesPerView));
  }

  const onResize = () => {
    setWidth(viewPortRef.current?.clientWidth ?? window.innerWidth);
  };

  const next = () => {
    if (resumeAutoPlayRef.current) {
      clearTimeout(resumeAutoPlayRef.current);
    }

    if (!loop) {
      setCurrentIndex(currI => {
        const nextIndex = Math.min(currI + 1, maxIndex);
        currentIndexRef.current = nextIndex;
        return nextIndex;
      });
    } else {
      setCurrentIndex(i => {
        const nextIndex = i + 1 > itemsCount - 1 ? itemsCount - 1 : i + 1;
        currentIndexRef.current = nextIndex;
        return nextIndex;
      });
    }

    resumeAutoPlayRef.current = window.setTimeout(startAutoPlay, 2000);
  };

  const prev = () => {
    if (resumeAutoPlayRef.current) {
      clearTimeout(resumeAutoPlayRef.current);
    }

    if (!loop) {
      setCurrentIndex(curr => {
        const prevIndex = Math.max(curr - 1, 0);
        currentIndexRef.current = prevIndex;
        return prevIndex;
      });
    } else {
      setCurrentIndex(curr => {
        const prevIndex = curr - 1 < 0 ? 0 : curr - 1;
        currentIndexRef.current = prevIndex;
        return prevIndex;
      });
    }

    resumeAutoPlayRef.current = window.setTimeout(startAutoPlay, 2000);
  };

  const goTo = (i: number) => {
    stopAutoplay();

    if (resumeAutoPlayRef.current) {
      clearTimeout(resumeAutoPlayRef.current);
    }

    setCurrentIndex(loop ? i + 1 : clamp(i, 0, maxIndex));

    resumeAutoPlayRef.current = window.setTimeout(startAutoPlay, 2000);
  };

  const startAutoPlay = () => {
    if (!autoplay?.enabled) return;
    setIsPlaying(true);
  };

  const stopAutoplay = () => {
    setIsPlaying(false);
  };

  const pointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggable) return;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }

    isMovingRef.current = true;
    startXPointerRef.current = e.clientX;
    startYPointerRef.current = e.clientY;
    prevTranslateXRef.current = translateX;
    currTranslateXRef.current = prevTranslateXRef.current;

    stopAutoplay();
  };

  const pointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isMovingRef.current) return;

    const clientX = e.clientX ?? 0;
    const clientY = e.clientY ?? 0;
    const deltaX = clientX - startXPointerRef.current;
    const deltaY = clientY - startYPointerRef.current;

    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 5) {
      isMovingRef.current = false;
      const perSlideWidth =
        (viewPortRef.current?.clientWidth ?? debouncedWidth) /
        Math.max(1, slidesPerView);
      setTranslateX(-currentIndex * perSlideWidth);
      return;
    }

    currTranslateXRef.current = prevTranslateXRef.current + deltaX;

    if (Math.abs(deltaX) > 5) preventClickRef.current = true;

    setTranslateX(
      clamp(currTranslateXRef.current, minTranslateX, maxTranslateX),
    );
  };

  const pointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isMovingRef.current) return;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }

    isMovingRef.current = false;

    const clientX = e.clientX ?? 0;
    const clientY = e.clientY ?? 0;
    const deltaX = clientX - startXPointerRef.current;
    const deltaY = clientY - startYPointerRef.current;

    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 5) {
      const perSlideWidth =
        (viewPortRef.current?.clientWidth ?? debouncedWidth) /
        Math.max(1, slidesPerView);
      setTranslateX(-currentIndex * perSlideWidth);
      return;
    }

    const perSlideWidth =
      (viewPortRef.current?.clientWidth ?? debouncedWidth) /
      Math.max(1, slidesPerView);
    const moveThreshold = perSlideWidth * 0.2;

    const moved = currTranslateXRef.current - prevTranslateXRef.current;
    const effectiveMove = moved !== 0 ? moved : deltaX;

    if (Math.abs(effectiveMove) > 5) {
      preventClickRef.current = true;
      window.setTimeout(() => (preventClickRef.current = false), 300);
    }

    if (Math.abs(effectiveMove) < moveThreshold) {
      setTranslateX(-currentIndex * perSlideWidth);
    } else if (effectiveMove < 0) {
      loop
        ? setCurrentIndex(i =>
            i + 1 > itemsCount - 1 ? itemsCount - 1 : i + 1,
          )
        : setCurrentIndex(i => clamp(i + 1, 0, maxIndex));
    } else {
      loop
        ? setCurrentIndex(i => (i - 1 < 0 ? 0 : i - 1))
        : setCurrentIndex(i => clamp(i - 1, 0, maxIndex));
    }

    if (autoplay?.enabled) startAutoPlay();
  };

  useEffect(() => {
    onResize();

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    const newSlidesPerView = getSlidesPerView(debouncedWidth);
    const newMaxIndex = calcMaxIndex(itemsCount, newSlidesPerView);

    setSlidesPerView(newSlidesPerView);
    setMaxIndex(newMaxIndex);
    setCurrentIndex(prev => (loop ? prev : clamp(prev, 0, newMaxIndex)));
  }, [debouncedWidth, itemsCount]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    const interval =
      typeof autoplay?.interval === 'number' ? autoplay.interval : 3000;

    if (isPlaying) {
      autoPlayRef.current = setInterval(next, interval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }

      if (resumeAutoPlayRef.current) {
        clearTimeout(resumeAutoPlayRef.current);
        resumeAutoPlayRef.current = null;
      }
    };
  }, [isPlaying, autoplay?.interval]);

  useEffect(() => {
    const slideWidth = debouncedWidth / slidesPerView;
    setTranslateX(-currentIndex * slideWidth);
  }, [currentIndex, debouncedWidth, slidesPerView]);

  useEffect(() => {
    if (!loop) {
      return;
    }

    const track = trackRef.current;

    if (!track) {
      return;
    }

    const afterTransitionEnd = () => {
      if (currentIndex === 0) {
        isTransitionOnRef.current = false;
        setCurrentIndex(itemsCount - 2);
        return;
      }

      if (currentIndex === itemsCount - 1) {
        isTransitionOnRef.current = false;
        setCurrentIndex(1);
        return;
      }
    };

    track.addEventListener('transitionend', afterTransitionEnd);

    return () => track.removeEventListener('transitionend', afterTransitionEnd);
  }, [loop, currentIndex, itemsCount]);

  useEffect(() => {
    if (!loop) {
      return;
    }

    if (!isTransitionOnRef.current) {
      requestAnimationFrame(() => {
        isTransitionOnRef.current = true;
      });
    }
  }, [currentIndex]);

  return {
    translateX,
    currentIndex,
    slidesPerView,
    viewPortRef,
    next,
    prev,
    goTo,
    maxIndex,
    pointerDown,
    pointerMove,
    pointerUp,
    isMovingRef,
    preventClickRef,
    trackRef,
    isTransitionOnRef,
  };
};
