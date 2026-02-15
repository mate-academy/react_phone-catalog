import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
};

export const useResizeEffect = ({ onResize }: { onResize: () => void }) => {
  useEffect(() => {
    const handleResize = () => {
      onResize();
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [onResize]);
};

export const useSwipe = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
  const startX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) {
      return;
    }

    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;

    const threshold = 50;

    if (diff > threshold) {
      onSwipeLeft();
    } else if (diff < -threshold) {
      onSwipeRight();
    }

    startX.current = null;
  };

  return { onTouchStart, onTouchEnd };
};
