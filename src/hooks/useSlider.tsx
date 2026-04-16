import { useState, useEffect, useRef, useCallback } from 'react';

type Mode = 'scroll' | 'transform';

interface UseSliderOptions {
  mode?: Mode;
  itemsCount?: number;
  loop?: boolean;
  autoDelay?: number;
}

const EDGE_THRESHOLD = 10;

export const useSlider = ({
  mode = 'scroll',
  itemsCount = 0,
  loop = true,
  autoDelay = 0,
}: UseSliderOptions = {}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const stepRef = useRef(0);

  const calculateStep = useCallback(() => {
    if (mode !== 'scroll') {
      return;
    }

    const element = sliderRef.current;

    if (!element || !element.firstElementChild) {
      return;
    }

    const firstChild = element.firstElementChild as HTMLElement;
    const gap = parseFloat(getComputedStyle(element).gap || '0');

    stepRef.current = firstChild.offsetWidth + gap;
  }, [mode]);

  const nextTransform = useCallback(() => {
    setCurrentIndex(prev => {
      if (prev >= itemsCount - 1) {
        return loop ? 0 : prev;
      }

      return prev + 1;
    });
  }, [itemsCount, loop]);

  const prevTransform = useCallback(() => {
    setCurrentIndex(prev => {
      if (prev <= 0) {
        return loop ? itemsCount - 1 : prev;
      }

      return prev - 1;
    });
  }, [itemsCount, loop]);

  const goTo = useCallback(
    (index: number) => {
      if (mode !== 'transform') {
        return;
      }

      setCurrentIndex(index);
    },
    [mode],
  );

  const nextScroll = useCallback(() => {
    const element = sliderRef.current;

    if (!element) {
      return;
    }

    if (stepRef.current === 0) {
      calculateStep();
    }

    const step = stepRef.current;

    if (step === 0) {
      return;
    }

    const calculatedIndex = Math.round(element.scrollLeft / step);
    const isEnd =
      element.scrollLeft + element.clientWidth >=
      element.scrollWidth - EDGE_THRESHOLD;

    if (isEnd && loop) {
      element.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      element.scrollTo({
        left: (calculatedIndex + 1) * step,
        behavior: 'smooth',
      });
    }
  }, [calculateStep, loop]);

  const prevScroll = useCallback(() => {
    const element = sliderRef.current;

    if (!element) {
      return;
    }

    if (stepRef.current === 0) {
      calculateStep();
    }

    const step = stepRef.current;

    if (step === 0) {
      return;
    }

    const calculatedIndex = Math.round(element.scrollLeft / step);

    if (element.scrollLeft <= EDGE_THRESHOLD && loop) {
      element.scrollTo({
        left: element.scrollWidth - element.clientWidth,
        behavior: 'smooth',
      });
    } else {
      element.scrollTo({
        left: (calculatedIndex - 1) * step,
        behavior: 'smooth',
      });
    }
  }, [calculateStep, loop]);

  const next = mode === 'transform' ? nextTransform : nextScroll;
  const prev = mode === 'transform' ? prevTransform : prevScroll;

  const pause = () => setIsPaused(true);
  const resume = () => setIsPaused(false);

  useEffect(() => {
    calculateStep();

    if (mode === 'scroll') {
      window.addEventListener('resize', calculateStep);

      return () => window.removeEventListener('resize', calculateStep);
    }
  }, [calculateStep, mode]);

  useEffect(() => {
    if (!autoDelay || isPaused) {
      return;
    }

    const id = setInterval(() => {
      if (mode === 'transform') {
        nextTransform();
      } else {
        nextScroll();
      }
    }, autoDelay);

    return () => clearInterval(id);
  }, [autoDelay, isPaused, mode, nextTransform, nextScroll]);

  return {
    sliderRef,
    next,
    prev,
    pause,
    resume,
    currentIndex,
    goTo,
  };
};
