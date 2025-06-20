import { useCallback, useEffect, useRef, useState } from 'react';
import { useMSContext } from '../context/MSContext';
import { useInit } from './useInit';
import { useRafLoop } from './useTranslate';
import { toggleTrackClass, getIndex, clamps } from '../helpers/swiperHelpers';
import { useResize } from './useResize';

//todo:
// change handlebyIndex offset change if gap;
// make helper function (debounce);
// change CSS to include/exclude GRID zones on props;
type Params = {
  clmp: boolean;
  swCoeff: number;
  gap: number;
  anSpeed: number;
  snap: boolean;
};

export const useMSCore = ({ clmp, swCoeff, snap, anSpeed }: Params) => {
  const {
    offsetRef,
    dragRef,
    trackRef,
    widthRef,
    listLength,
    infinite,
    timeoutRef,
  } = useMSContext();
  const startXRef = useRef<number | null>(null);
  const startIndex = useRef<number | null>(null);
  const [, forceRerender] = useState({});

  const rerender = () => {
    forceRerender({});
  };

  const { startRafLoop, endRafLoop, snapHandle, setByIndex } = useRafLoop({
    swCoeff,
    toggleTrackClass,
    rerender,
  });

  useInit();
  useResize({ setByIndex, getIndex });

  const start = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (
      infinite &&
      (offsetRef.current < widthRef.current * 2 ||
        offsetRef.current > widthRef.current * (listLength + 1))
    ) {
      return;
    }

    e.currentTarget.setPointerCapture(e.pointerId);
    startXRef.current = e.clientX;
    startIndex.current = Math.round(offsetRef.current / widthRef.current);
    dragRef.current = 0;
    toggleTrackClass(trackRef.current as HTMLUListElement, dragRef.current);
    startRafLoop();
  }, []);

  const move = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dragRef.current === null || startXRef.current === null) {
      return;
    }

    const rawDrag = e.clientX - startXRef.current;
    const max = widthRef.current * (listLength - 1);

    dragRef.current = infinite
      ? rawDrag
      : clamps(clmp, max, rawDrag, offsetRef.current);
  }, []);

  const end = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (startXRef.current === null) {
      return;
    }

    e.currentTarget.releasePointerCapture(e.pointerId);
    endRafLoop();
    if (snap) {
      snapHandle(startIndex.current as number);
    } else {
      offsetRef.current -= (dragRef.current as number) * swCoeff;
    }

    dragRef.current = null;
    startXRef.current = null;
    startIndex.current = null;
  }, []);

  useEffect(() => {
    if (infinite) {
      if (getIndex(offsetRef.current, widthRef.current) > listLength + 1) {
        timeoutRef.current = setTimeout(() => setByIndex(2, false), anSpeed);
      } else if (
        getIndex(offsetRef.current, widthRef.current) <
        listLength - 2
      ) {
        timeoutRef.current = setTimeout(() => setByIndex(5, false), anSpeed);
      } else {
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [rerender]);

  const handlers = {
    onPointerDown: start,
    onPointerMove: move,
    onPointerUp: end,
    onPointerCancel: end,
  };

  // #endregion
  //autoplay

  return { handlers, setByIndex };
};
