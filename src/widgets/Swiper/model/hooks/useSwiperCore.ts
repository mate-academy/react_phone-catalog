import { useCallback, useEffect, useRef } from 'react';
import { useSwiperContext } from '../SwiperContext';

export const useSwiperCore = () => {
  const dragRef = useRef(0);
  const startXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const { trackRef, dataset, offsetRef, rerender, width, indexRef } =
    useSwiperContext();

  // #region RAF Loop
  const rafIdRef = useRef<number | null>(null);

  const SWIPE_COEFF = 1.3;

  const startRafLoop = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    const loop = () => {
      if (trackRef.current) {
        const transformValue = `translateX(${-offsetRef.current + dragRef.current * SWIPE_COEFF}px)`;

        trackRef.current.style.transform = transformValue;
        trackRef.current.style.transition = isDraggingRef.current
          ? 'transform ease !important'
          : 'transform .35s ease-in-out !important';
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    loop();
  }, [isDraggingRef, trackRef, offsetRef]);

  const endRafLoop = () => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  };
  // #endregion

  const extended = [
    { ...dataset[dataset.length - 1] },
    ...dataset.map(item => ({ ...item })),
    { ...dataset[0] },
  ];
  const toRender = extended.map((item, idx) => ({ id: idx, ...item }));

  // #region Handlers
  const start = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();

    e.currentTarget.setPointerCapture(e.pointerId);

    startXRef.current = e.clientX;
    dragRef.current = 0;
    isDraggingRef.current = true;
    startRafLoop();
  };

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!isDraggingRef.current || startXRef.current === null) {
      return;
    }

    dragRef.current = event.clientX - startXRef.current;
  };

  const end = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.releasePointerCapture(e.pointerId);

    endRafLoop();

    offsetRef.current -= dragRef.current * SWIPE_COEFF;
    dragRef.current = 0;
    startXRef.current = null;
    isDraggingRef.current = false;
    rerender();
  };

  const handleByIndex = (idx: number) => {
    offsetRef.current = idx * width;
    startRafLoop();

    endRafLoop();
    rerender();
  };

  const handlers = {
    onPointerDown: start,
    onPointerMove: move,
    onPointerUp: end,
    onPointerCancel: end,
  };

  // #endregion

  // #region SnapHandlers

  useEffect(() => {
    handleByIndex(indexRef.current);
  }, [width]);

  return { handlers, toRender, handleByIndex };
};
