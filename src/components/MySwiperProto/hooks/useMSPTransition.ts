import { useCallback } from 'react';
import { useMSPContext } from '../context/useMSPContext';
import { useRafLoop } from './useRAFLoop';

type Props = {
  startRafLoop: () => void;
  endRafLoop: () => void;
  animationSpeed: number;
};

export const useMSPTransition = ({ animationSpeed }: Props) => {
  const { activeIndexRef, offsetRef, isDraggingRef, snapTimerRef } =
    useMSPContext();
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
        clearTimeout(snapTimerRef.current as NodeJS.Timeout);
        snapTimerRef.current = null;
      }, animationSpeed);
    },
    [],
  );

  return { firstStageTransition, secondStageTransition };
};
