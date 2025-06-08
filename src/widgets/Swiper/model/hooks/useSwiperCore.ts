import { useCallback, useEffect, useRef } from 'react';
import { useSwiperContext } from '../SwiperContext';

export const useSwiperCore = () => {
  const dragRef = useRef<number>(0);
  const startXRef = useRef<number | null>(null);
  const startIndex = useRef<number | null>(null);
  const snapTimerRef = useRef<NodeJS.Timeout | number | null>(null);
  const isDraggingRef = useRef(false);
  const {
    trackRef,
    offsetRef,
    rerender,
    width,
    activeIndexRef,
    infinite,
    listLength,
    clamp,
  } = useSwiperContext();

  //                      TODO: autoplay, animationSpeed, autoscroll

  // #region RAF Loop
  const rafIdRef = useRef<number | null>(null);

  const SWIPE_COEFF = 1.2;

  const startRafLoop = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    const loop = () => {
      if (trackRef.current) {
        const transformValue = isDraggingRef.current
          ? `translateX(${-offsetRef.current + dragRef.current * SWIPE_COEFF}px)`
          : `translateX(${-offsetRef.current}px)`;

        if (isDraggingRef.current) {
          trackRef.current.classList.remove('swiper__track--animated');
          trackRef.current.classList.add('swiper__track--dragging');
        } else if (!isDraggingRef.current) {
          trackRef.current.classList.remove('swiper__track--dragging');
          trackRef.current.classList.add('swiper__track--animated');
        }

        trackRef.current.style.transform = transformValue;
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    loop();
  }, [isDraggingRef, trackRef, offsetRef, width]);

  const endRafLoop = () => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  };
  // #endregion

  // #region Handlers
  const start = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (snapTimerRef.current !== null) {
      return;
    }

    e.currentTarget.setPointerCapture(e.pointerId);

    startXRef.current = e.clientX;

    if (infinite) {
      startIndex.current = activeIndexRef.current;
    }

    dragRef.current = 0;
    isDraggingRef.current = true;
    startRafLoop();
  };

  const handleByIndex = (idx: number) => {
    offsetRef.current = infinite ? (idx + 1) * width : idx * width;
    startRafLoop();

    endRafLoop();
    rerender();
  };

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
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
      const futureOffset = offsetRef.current - rawDrag * SWIPE_COEFF;
      const minOffset = 0;
      const maxOffset = infinite
        ? (listLength + 1) * width
        : (listLength - 1) * width;

      if (futureOffset < minOffset) {
        dragRef.current = (offsetRef.current - minOffset) / SWIPE_COEFF;
      } else if (futureOffset > maxOffset) {
        dragRef.current = (offsetRef.current - maxOffset) / SWIPE_COEFF;
      } else {
        dragRef.current = rawDrag;
      }
    } else {
      dragRef.current = rawDrag;
    }
  };

  // #region SnapHandlers
  const snapHandler = () => {
    if (startIndex.current === null || dragRef.current === null) {
      return;
    }

    const treshold = width / 10;
    const step = dragRef.current < 0 ? 1 : -1;
    const isFirst = activeIndexRef.current <= 0 && step === -1;
    const isLast = activeIndexRef.current >= listLength - 1 && step === 1;

    if (snapTimerRef.current) {
      clearTimeout(snapTimerRef.current);
      snapTimerRef.current = null;
    }

    if (Math.abs(dragRef.current) > treshold) {
      dragRef.current = 0;

      if (isFirst && step === -1) {
        isDraggingRef.current = false;
        activeIndexRef.current = -1;
        offsetRef.current = 0;
        startRafLoop();
        endRafLoop();

        snapTimerRef.current = setTimeout(() => {
          activeIndexRef.current = listLength - 1;
          offsetRef.current = listLength * width;
          rerender();
          snapTimerRef.current = null;
        }, 150);
      } else if (isLast && step === 1) {
        isDraggingRef.current = false;
        activeIndexRef.current = listLength;
        offsetRef.current = (listLength + 1) * width;
        startRafLoop();
        endRafLoop();

        snapTimerRef.current = setTimeout(() => {
          activeIndexRef.current = 0;
          offsetRef.current = width;
          rerender();
          snapTimerRef.current = null;
        }, 150);
      } else {
        isDraggingRef.current = false;
        handleByIndex(startIndex.current + step);
      }
    } else {
      isDraggingRef.current = false;
      handleByIndex(startIndex.current);
    }

    startIndex.current = null;
  };
  // #endregion

  const end = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.releasePointerCapture(e.pointerId);
    endRafLoop();
    if (snapTimerRef.current !== null) {
      return;
    }

    if (dragRef.current === null) {
      return;
    }

    if (!infinite) {
      offsetRef.current -= dragRef.current * SWIPE_COEFF;
    } else {
      snapHandler();
    }

    dragRef.current = 0;
    startXRef.current = null;
    isDraggingRef.current = false;
    rerender();
  };

  const handlers = {
    onPointerDown: start,
    onPointerMove: move,
    onPointerUp: end,
    onPointerCancel: end,
  };
  // #endregion

  // #region ResizePositionHandler
  useEffect(() => {
    handleByIndex(0);
  }, [width]);
  // #endregion

  useEffect(() => {
    return () => {
      if (snapTimerRef.current) {
        clearTimeout(snapTimerRef.current);
      }
    };
  }, []);

  return { handlers, handleByIndex };
};
