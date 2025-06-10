import { useCallback } from 'react';
import { useMSPContext } from '../context/useMSPContext';
import { useRafLoop } from './useRAFLoop';

type Props = {
  startRafLoop: () => void;
  endRafLoop: () => void;
  animationSpeed: number;
};

export const useMSPTransition = ({ animationSpeed }: Props) => {
  const { offsetRef, isDraggingRef, snapTimerRef, rerender } = useMSPContext();
  const { startRafLoop, endRafLoop } = useRafLoop();

  const firstStageTransition = useCallback((newOffset: number) => {
    offsetRef.current = newOffset;
    startRafLoop();
    endRafLoop();
    rerender();
  }, []);

  const secondStageTransition = useCallback((newOffset: number) => {
    snapTimerRef.current = setTimeout(() => {
      isDraggingRef.current = true;
      offsetRef.current = newOffset;
      startRafLoop();
      endRafLoop();
      isDraggingRef.current = false;
      clearTimeout(snapTimerRef.current as NodeJS.Timeout);
      snapTimerRef.current = null;
    }, animationSpeed);
  }, []);

  return { firstStageTransition, secondStageTransition };
};
