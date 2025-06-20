import { useCallback, useEffect, useRef, useState } from 'react';
import { useMSContext } from '../context/MSContext';
import { useInit } from './useInit';
import { useRafLoop } from './useTranslate';
import { toggleTrackClass, getIndex, clamps } from '../helpers/swiperHelpers';
import { useResize } from './useResize';

// change CSS to include/exclude GRID zones on props;
// move checks on infinite and index to helper;

type Params = {
  swCoeff: number;
  anSpeed: number;
  snap: boolean;
  treshold: number;
};

export const useMSCore = ({ swCoeff, snap, anSpeed, treshold }: Params) => {
  const { offset, drag, track, width, listLength, infinite, clamp, gap } =
    useMSContext();
  const startXRef = useRef<number | null>(null);
  const startIndex = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [, forceRerender] = useState({});

  const rerender = () => {
    forceRerender({});
  };

  const { startRafLoop, endRafLoop, snapHandle, setByIndex } = useRafLoop({
    swCoeff,
    toggleTrackClass,
    rerender,
    treshold,
    gap,
  });

  useInit();
  useResize({ setByIndex, getIndex });

  const start = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (
      infinite &&
      (offset.current < width.current * 2 + gap ||
        offset.current >
          width.current * (listLength + 1) + gap * (listLength + 2))
    ) {
      return;
    }

    e.currentTarget.setPointerCapture(e.pointerId);
    startXRef.current = e.clientX;
    startIndex.current = Math.round(offset.current / width.current);
    drag.current = 0;
    toggleTrackClass(track.current as HTMLUListElement, drag.current);
    startRafLoop();
  }, []);

  const move = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (drag.current === null || startXRef.current === null) {
      return;
    }

    const rawDrag = e.clientX - startXRef.current;
    const max = width.current * (listLength - 1);

    drag.current = infinite
      ? rawDrag
      : clamps(clamp, max, rawDrag, offset.current);
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
      offset.current -= (drag.current as number) * swCoeff;
    }

    drag.current = null;
    startXRef.current = null;
    startIndex.current = null;
  }, []);

  useEffect(() => {
    if (infinite) {
      if (getIndex(offset.current, width.current, gap) > listLength + 1) {
        timeoutRef.current = setTimeout(() => setByIndex(2, false), anSpeed);
      } else if (
        getIndex(offset.current, width.current, gap) <
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
