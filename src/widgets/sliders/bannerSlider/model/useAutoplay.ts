import { useSliderData } from '@shared/lib';
import { useEffect, useRef } from 'react';

type Props = {
  setByIndex: (idx: number, clamped?: boolean) => void;
  interval?: number;
};
export const useAutoplay = ({ setByIndex, interval = 5000 }: Props) => {
  const { mechanics } = useSliderData();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef(false);

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
    if (isPausedRef.current) {
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setByIndex(mechanics.index.current + 1);
    }, interval);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [mechanics.index.current, setByIndex, interval]);

  return { pause, resume };
};
