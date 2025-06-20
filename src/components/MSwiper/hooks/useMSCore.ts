import { useCallback, useRef, useState } from 'react';
import { useMSContext } from '../context/MSContext';
import { useInit } from './useInit';
import { useRafLoop } from './useTranslate';
import { toggleTrackClass, getIndex, clamps } from '../helpers/swiperHelpers';
import { useResize } from './useResize';

//todo:
// change handlebyIndex offset change if gap;
// make helper function (debounce);
// change CSS to include/exclude GRID zones on props;
// switch rerender on state
type Params = {
  clmp: boolean;
  swCoeff: number;
  gap: number;
  anSpeed: number;
  snap: boolean;
};

export const useMSCore = ({ clmp, swCoeff, snap }: Params) => {
  const { offsetRef, dragRef, trackRef, widthRef, listLength } = useMSContext();
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

    dragRef.current = clamps(clmp, max, rawDrag, offsetRef.current);
  }, []);

  const end = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
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
    rerender();
  }, []);

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
