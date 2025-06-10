import { useCallback, useRef, useState } from 'react';

export const useMSPContext = () => {
  const startXRef = useRef<number | null>(null);
  const startIndex = useRef<number | null>(null);
  const dragRef = useRef<number>(0);
  const isDraggingRef = useRef(false);

  const snapTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [, forceRerender] = useState({});
  const rerender = useCallback(() => {
    forceRerender({});
  }, []);
  const SWIPE_COEFF = 1.2;

  return {
    startXRef,
    startIndex,
    dragRef,
    isDraggingRef,
    snapTimerRef,
    rerender,
    SWIPE_COEFF,
  };
};
