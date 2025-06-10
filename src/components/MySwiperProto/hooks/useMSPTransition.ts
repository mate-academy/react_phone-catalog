import { useCallback, useEffect } from 'react';
import { useSwiperContext } from '../context/MSPContext';
import { useRafLoop } from './useRAFLoop';

type Props = {
  startRafLoop: () => void;
  endRafLoop: () => void;
  animationSpeed: number;
};

export const useMSPTransition = ({ animationSpeed }: Props) => {
  const { activeIndexRef, offsetRef, isDraggingRef, snapTimerRef } =
    useSwiperContext();
  const { startRafLoop, endRafLoop } = useRafLoop();

  const firstStageTransition = useCallback(
    (newIndex: number, newOffset: number) => {
      activeIndexRef.current = newIndex;
      offsetRef.current = newOffset;
      startRafLoop();
      endRafLoop();
    },
    [],
  );

  const secondStageTransition = useCallback(
    (newIndex: number, newOffset: number) => {
      snapTimerRef.current = setTimeout(() => {
        isDraggingRef.current = true;
        activeIndexRef.current = newIndex;
        offsetRef.current = newOffset;
        startRafLoop();
        endRafLoop();
        isDraggingRef.current = false;
        snapTimerRef.current = null;
      }, animationSpeed);
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (snapTimerRef.current) {
        clearTimeout(snapTimerRef.current);
      }
    };
  }, []);

  return { firstStageTransition, secondStageTransition };
};
