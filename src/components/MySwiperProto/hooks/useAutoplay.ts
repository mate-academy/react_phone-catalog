import { useRef } from 'react';
import { Autoplay, Direction } from '../types/MSPtypes';
import { useMSPContext } from './useMSPContext';

type Props = {
  autoplay: Autoplay | false;
  buttonHandler: (dir: Direction) => void;
};

export const useAutoplay = ({ autoplay, buttonHandler }: Props) => {
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayCountRef = useRef<number>(0);
  const { isDraggingRef } = useMSPContext();

  const swAutoplay = () => {
    if (!autoplay) {
      return;
    }

    const { direction, delay, times } = autoplay;

    const cleanup = () => {
      if (autoPlayTimerRef.current !== null) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
    };

    cleanup();

    if (!autoplay) {
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      if (!isDraggingRef.current) {
        buttonHandler(direction);
        autoPlayCountRef.current += 1;
        if (autoPlayCountRef.current >= times) {
          cleanup();
        }
      }
    }, delay);

    return cleanup;
  };

  return { swAutoplay };
};
