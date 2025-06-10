import { useCallback, useEffect, useRef } from 'react';
import { Autoplay, Direction } from '../types/MSPtypes';
import { useMSPContext } from '../context/useMSPContext';

type Props = {
  autoplay: Autoplay | false;
  buttonHandler: (dir: Direction) => void;
};

export const useAutoplay = ({ autoplay, buttonHandler }: Props) => {
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayCountRef = useRef<number>(1);
  const { isDraggingRef, snapTimerRef } = useMSPContext();

  const cleanup = useCallback(() => {
    if (autoPlayTimerRef.current !== null) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (!autoplay) {
      return;
    }

    const { direction, delay, times } = autoplay;

    cleanup();

    autoPlayTimerRef.current = setInterval(() => {
      if (autoPlayCountRef.current >= times) {
        cleanup();
      }

      if (isDraggingRef.current === true || snapTimerRef.current !== null) {
        cleanup();

        return startAutoplay();
      }

      buttonHandler(direction);
      autoPlayCountRef.current += 1;
    }, delay);
  }, []);

  useEffect(() => {
    if (!autoplay) {
      cleanup();

      return;
    }

    startAutoplay();

    return cleanup;
  }, []);
};
