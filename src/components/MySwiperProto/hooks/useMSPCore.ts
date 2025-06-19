import { useCallback, useRef } from 'react';
import { useMSPContext } from '../context/useMSPContext';
import { Direction } from '../types/MSPtypes';
import { useAutoplay } from './useAutoplay';
import { useRafLoop } from './useRAFLoop';
import { useMSPTransition } from './useMSPTransition';
import { useResize } from './useResize';
import { useInitialSetter } from './useInitialSetter';

//todo:
// change handlebyIndex offset change if gap;
// make helper function (debounce);
// switch RAF on css translateX if not dragging change;
// change CSS to include/exclude GRID zones on props;
// try to separate contexts
// make prop for snaps
// watch dragRef params; merge dragRef && isDragging
// switch rerender on state

export const useMSPCore = () => {
  const {
    offsetRef,
    widthRef,
    infinite,
    listLength,
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

  useInitialSetter();

  const { startRafLoop, endRafLoop } = useRafLoop();
  const { firstStageTransition, secondStageTransition } = useMSPTransition({
    startRafLoop,
    endRafLoop,
    animationSpeed,
  });

  const getIndex = () => {
    let index;

    if (!infinite) {
      index = Math.round(offsetRef.current / widthRef.current);
    } else {
      index = Math.round(offsetRef.current / widthRef.current) - 1;
    }

    return index;
  };

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
    const newIndex = getIndex() + mod;

    if (infinite) {
      if (newIndex < 0) {
        handleByIndex(newIndex);
        secondStageTransition(listLength * widthRef.current);
      } else if (newIndex > listLength - 1) {
        handleByIndex(newIndex);
        secondStageTransition(widthRef.current);
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
    const isFirst = getIndex() <= 0 && step === -1;
    const isLast = getIndex() >= listLength - 1 && step === 1;

    if (Math.abs(dragRef.current) > treshold) {
      dragRef.current = 0;
      isDraggingRef.current = false;
      if (isFirst && step === -1) {
        firstStageTransition(0);
        secondStageTransition(listLength * widthRef.current);
      } else if (isLast && step === 1) {
        firstStageTransition((listLength + 1) * widthRef.current);

        secondStageTransition(widthRef.current);
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
    startIndex.current = getIndex();
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

    if (snapTimerRef.current !== null) {
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

  useResize({ handleByIndex, getIndex });

  useAutoplay({ autoplay, buttonHandler });

  return { handlers, handleByIndex, buttonHandler, getIndex };
};
