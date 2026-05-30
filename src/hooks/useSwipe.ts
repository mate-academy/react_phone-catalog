import { ScreenSize } from '../types/screenSize';
import useMediaQuery from './useMediaQuery';

type SwipeHandler = {
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
};

export const useSwipe = (
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
  canDoubleScrollLeft: () => boolean = () => false,
  canDoubleScrollRight: () => boolean = () => false,
): SwipeHandler => {
  let touchStartX = 0;
  let touchEndX = 0;

  const isTablet = useMediaQuery(ScreenSize.Tablet);
  const isDesktop = useMediaQuery(ScreenSize.Desktop);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
    touchEndX = touchStartX; // Resets touchEndX each new swipe at the beginning
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    // Swipe
    const swipeDistance = touchEndX - touchStartX;
    const doubleScroll = isTablet ? 350 : 230;

    // Double scrolling with a longer swipe on phone or tablet
    if (!isDesktop) {
      if (swipeDistance > doubleScroll) {
        if (canDoubleScrollLeft()) {
          onSwipeLeft();
          onSwipeLeft();
        } else {
          onSwipeLeft();
        }

        return;
      }

      if (swipeDistance < -doubleScroll) {
        if (canDoubleScrollRight()) {
          onSwipeRight();
          onSwipeRight();
        } else {
          onSwipeRight();
        }

        return;
      }
    }

    if (swipeDistance > 50) {
      onSwipeLeft(); // left swipe
    }

    if (swipeDistance < -50) {
      onSwipeRight(); // right swipe
    }
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};
