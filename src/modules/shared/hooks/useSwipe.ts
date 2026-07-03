import { useEffect, useRef, useCallback, RefObject } from 'react';

export function useSwipe(
  handleSwipe: (start: number, end: number) => void,
  sliderRef: RefObject<HTMLDivElement>,
) {
  const startX = useRef(0);

  const handleStart = useCallback((e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
  }, []);

  const handleEnd = useCallback(
    (e: TouchEvent) => {
      handleSwipe(startX.current, e.changedTouches[0].clientX);
    },
    [handleSwipe],
  );

  useEffect(() => {
    const element = sliderRef.current;

    if (!element) {
      return;
    }

    const media = window.matchMedia('(max-width: 639px)');

    const attach = () => {
      element.addEventListener('touchstart', handleStart);
      element.addEventListener('touchend', handleEnd);
    };

    const detach = () => {
      element.removeEventListener('touchstart', handleStart);
      element.removeEventListener('touchend', handleEnd);
    };

    const update = () => {
      if (media.matches) {
        attach();
      } else {
        detach();
      }
    };

    update();
    media.addEventListener('change', update);

    return () => {
      detach();
      media.removeEventListener('change', update);
    };
  }, [handleStart, handleEnd, sliderRef]);
}
