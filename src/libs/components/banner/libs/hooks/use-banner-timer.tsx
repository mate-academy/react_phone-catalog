import { useCallback, useEffect, useRef } from 'react';
import { SLIDER_DELAY } from '../../../../enums';

export const useBannerTimer = (callback: () => void) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(callback, SLIDER_DELAY);
  }, [callback]);

  useEffect(() => {
    startTimer();

    return () => {
      stopTimer();
    };
  }, [startTimer, stopTimer]);

  return { startTimer, stopTimer };
};
