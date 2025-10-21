import { useEffect, useRef } from 'react';
import { useSliderData } from './sliderContext';

const AUTOPLAY_INTERVAL = 5000;

export const useAutoplay = (
  autoplay: boolean,
  setByIndex: (idx: number, clamped?: boolean) => void,
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef(false);
  const { mechanics } = useSliderData();

  const pause = () => {
    isPausedRef.current = true;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const resume = () => {
    isPausedRef.current = false;
  };

  useEffect(() => {
    if (!autoplay || isPausedRef.current) {
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setByIndex(mechanics.index.current + 1);
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [mechanics.index.current, setByIndex, AUTOPLAY_INTERVAL]);

  return { pause, resume };
};
