import { useCallback, useRef } from 'react';

export const useSwipe = (goToNext: () => void, goToPrevious: () => void) => {
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      touchStartX.current = event.touches[0].clientX;
    }, [],
  );

  const handleTouchMove = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      if (touchStartX.current === null) {
        return;
      }

      const currentX = event.touches[0].clientX;
      const deltaX = touchStartX.current - currentX;

      if (deltaX > 0) {
        goToNext();
      } else if (deltaX < 0) {
        goToPrevious();
      }

      touchStartX.current = null;
    }, [goToNext, goToPrevious],
  );

  return { handleTouchStart, handleTouchMove };
};
