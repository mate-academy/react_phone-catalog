import { useCallback, useEffect, useRef } from 'react';
import { useMSPContext } from '../context/useMSPContext';
import { Direction } from '../types/MSPtypes';
import { useAutoplay } from './useAutoplay';
import { useRafLoop } from './useRAFLoop';
import { useMSPTransition } from './useMSPTransition';
import { useResize } from './useResize';

//                      TODO: add snap mode, correct positioning if gap
export const useMSPCore = () => {
  const {
    offsetRef,
    widthRef,
    infinite,
    listLength,
    activeIndexRef,
    isDraggingRef,
    snapTimerRef,
    dragRef,
    autoplay,
    animationSpeed,
    clamp,
    swipeCoeff,
  } = useMSPContext();
  const startXRef = useRef<number | null>(null);
  const startIndex = useRef<number | null>(null);

  const { startRafLoop, endRafLoop } = useRafLoop();
  const { firstStageTransition, secondStageTransition } = useMSPTransition({
    startRafLoop,
    endRafLoop,
    animationSpeed,
  });

  // #region Handlers
  const handleByIndex = useCallback((idx: number) => {
    offsetRef.current = infinite
      ? (idx + 1) * widthRef.current
      : idx * widthRef.current;
    startRafLoop();
    endRafLoop();
  }, []);

  const buttonHandler = useCallback((dir: Direction) => {
    const mod = dir === Direction.LEFT ? -1 : 1;
    const newIndex = activeIndexRef.current + mod;

    if (infinite) {
      if (newIndex < 0) {
        handleByIndex(newIndex);
        secondStageTransition(listLength - 1, listLength * widthRef.current);
      } else if (newIndex > listLength - 1) {
        handleByIndex(newIndex);
        secondStageTransition(0, widthRef.current);
      } else {
        handleByIndex(newIndex);
      }
    }

    if (newIndex < 0 || newIndex > listLength - 1) {
      return;
    }

    handleByIndex(newIndex);
  }, []);

  const snapHandler = useCallback(() => {
    if (startIndex.current === null || dragRef.current === null) {
      return;
    }

    const treshold = widthRef.current / 10;
    const step = dragRef.current < 0 ? 1 : -1;
    const isFirst = activeIndexRef.current <= 0 && step === -1;
    const isLast = activeIndexRef.current >= listLength - 1 && step === 1;

    if (Math.abs(dragRef.current) > treshold) {
      dragRef.current = 0;
      isDraggingRef.current = false;
      if (isFirst && step === -1) {
        firstStageTransition(-1, 0);
        secondStageTransition(listLength - 1, listLength * widthRef.current);
      } else if (isLast && step === 1) {
        firstStageTransition(listLength, (listLength + 1) * widthRef.current);
        secondStageTransition(0, widthRef.current);
      } else {
        handleByIndex(startIndex.current + step);
      }
    } else {
      isDraggingRef.current = false;
      handleByIndex(startIndex.current);
    }

    startIndex.current = null;
  }, []);

  const start = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (snapTimerRef.current !== null) {
      return;
    }

    e.currentTarget.setPointerCapture(e.pointerId);
    startXRef.current = e.clientX;
    startIndex.current = activeIndexRef.current;
    dragRef.current = 0;
    isDraggingRef.current = true;
    startRafLoop();
  }, []);

  const move = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!isDraggingRef.current || startXRef.current === null) {
      return;
    }

    if (snapTimerRef.current !== null) {
      dragRef.current = 0;

      return;
    }

    const rawDrag = event.clientX - startXRef.current;

    if (clamp) {
      const futureOffset = offsetRef.current - rawDrag * swipeCoeff;
      const maxOffset =
        (infinite ? listLength + 1 : listLength - 1) * widthRef.current;

      dragRef.current =
        futureOffset < 0
          ? offsetRef.current / swipeCoeff
          : futureOffset > maxOffset
            ? (offsetRef.current - maxOffset) / swipeCoeff
            : rawDrag;
    } else {
      dragRef.current = rawDrag;
    }
  }, []);

  const end = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.releasePointerCapture(e.pointerId);
    endRafLoop();

    if (snapTimerRef.current !== null || dragRef.current === null) {
      return;
    }

    if (!infinite) {
      offsetRef.current -= dragRef.current * swipeCoeff;
    } else {
      snapHandler();
    }

    dragRef.current = 0;
    startXRef.current = null;
    startIndex.current = null;
    isDraggingRef.current = false;
  }, []);

  const handlers = {
    onPointerDown: start,
    onPointerMove: move,
    onPointerUp: end,
    onPointerCancel: end,
  };

  // #endregion
  //autoplay
  const { swAutoplay } = useAutoplay({ autoplay, buttonHandler });

  useResize({ handleByIndex });

  useEffect(() => {
    if (autoplay) {
      swAutoplay();
    }
  }, [autoplay, buttonHandler]);

  return { handlers, handleByIndex, buttonHandler };
};
