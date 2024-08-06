import { useEffect, useRef } from 'react';

export const useSwipe = (
  handleMoveSlidesLeft: () => void,
  handleMoveSlidesRight: () => void,
) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    let startX: number | undefined;

    const handleSwipe = (event: TouchEvent) => {
      if (startX === undefined) {
        return;
      }

      const threshold = 100;
      const deltaX = event.changedTouches[0].clientX - startX;

      if (deltaX > threshold) {
        handleMoveSlidesLeft();
      } else if (deltaX < -threshold) {
        handleMoveSlidesRight();
      }
    };

    const touchStartHandler = (event: TouchEvent) => {
      startX = event.touches[0].clientX;
    };

    const touchEndHandler = (event: TouchEvent) => {
      handleSwipe(event);
    };

    const element = elementRef.current;

    element.addEventListener('touchstart', touchStartHandler, {
      passive: true,
    });
    element.addEventListener('touchend', touchEndHandler);

    return () => {
      if (!element) {
        return;
      }

      element.removeEventListener('touchstart', touchStartHandler);
      element.removeEventListener('touchend', touchEndHandler);
    };
  }, [handleMoveSlidesLeft, handleMoveSlidesRight]);

  return elementRef;
};
