import { useCallback, useEffect, useRef } from 'react';
import { useSwiperContext } from '../SwiperContext';
import { ArrDir } from '../types';
//                      TODO: autoplay, animationSpeed, autoscroll
export const useSwiperCore = () => {
  const startXRef = useRef<number | null>(null);
  const startIndex = useRef<number | null>(null);
  const dragRef = useRef<number>(0);
  const isDraggingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const snapTimerRef = useRef<NodeJS.Timeout | number | null>(null);
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

  // #region helpers and const
  const SWIPE_COEFF = 1.2;

  const toggleTrackClass = () => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    track.classList.toggle('swiper__track--dragging', isDraggingRef.current);
    track.classList.toggle('swiper__track--animated', !isDraggingRef.current);
  };

  const snapTransition = (
    newIndex: number,
    newOffset: number,
    delay: number,
  ) => {
    snapTimerRef.current = setTimeout(() => {
      activeIndexRef.current = newIndex;
      offsetRef.current = newOffset;
      rerender();
      snapTimerRef.current = null;
    }, delay);
  };

  //#endregion

  // #region RAF Loop
  const startRafLoop = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    const loop = () => {
      if (trackRef.current) {
        const transformValue = isDraggingRef.current
          ? `translateX(${-offsetRef.current + dragRef.current * SWIPE_COEFF}px)`
          : `translateX(${-offsetRef.current}px)`;

        toggleTrackClass();

        trackRef.current.style.transform = transformValue;
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    loop();
  }, []);

  const endRafLoop = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);
  // #endregion

  // #region Handlers
  const start = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();

    // block start if infinite && end of track
    if (snapTimerRef.current !== null) {
      return;
    }

    // setting up event capture and start point & index, providing dragRef
    e.currentTarget.setPointerCapture(e.pointerId);
    startXRef.current = e.clientX;
    startIndex.current = activeIndexRef.current;
    dragRef.current = 0;
    isDraggingRef.current = true;

    //start animation
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
    // protection agains accidental event
    if (!isDraggingRef.current || startXRef.current === null) {
      return;
    }
    //protection against abusing drag before infinite transition

    if (snapTimerRef.current !== null) {
      dragRef.current = 0;

      return;
    }

    const rawDrag = event.clientX - startXRef.current;

    if (clamp) {
      const futureOffset = offsetRef.current - rawDrag * SWIPE_COEFF;
      const maxOffset = (infinite ? listLength + 1 : listLength - 1) * width;

      dragRef.current =
        futureOffset < 0
          ? offsetRef.current / SWIPE_COEFF
          : futureOffset > maxOffset
            ? (offsetRef.current - maxOffset) / SWIPE_COEFF
            : rawDrag;
    } else {
      dragRef.current = rawDrag;
    }
  };

  const snapHandler = (param = false, dir = ArrDir.Previous) => {
    if (param === true) {
      startIndex.current = activeIndexRef.current;
    }

    if (
      startIndex.current === null ||
      (dragRef.current === null && param === false)
    ) {
      return;
    }

    const treshold = width / 10;
    let step;
    let isFirst;
    let isLast;

    if (param) {
      step = dir === ArrDir.Previous ? -1 : 1;
      isFirst = activeIndexRef.current <= 0 && step === -1;
      isLast = activeIndexRef.current >= listLength - 1 && step === 1;
    } else {
      step = dragRef.current < 0 ? 1 : -1;
      isFirst = activeIndexRef.current <= 0 && step === -1;
      isLast = activeIndexRef.current >= listLength - 1 && step === 1;
    }

    if (snapTimerRef.current) {
      clearTimeout(snapTimerRef.current);
      snapTimerRef.current = null;
    }

    if (Math.abs(dragRef.current) > treshold || param === true) {
      dragRef.current = 0;
      isDraggingRef.current = false;
      if (isFirst && step === -1) {
        activeIndexRef.current = -1;
        offsetRef.current = 0;
        startRafLoop();
        endRafLoop();

        snapTransition(listLength - 1, listLength * width, 150);
      } else if (isLast && step === 1) {
        activeIndexRef.current = listLength;
        offsetRef.current = (listLength + 1) * width;
        startRafLoop();
        endRafLoop();

        snapTransition(0, width, 150);
      } else {
        handleByIndex(startIndex.current + step);
      }
    } else {
      isDraggingRef.current = false;
      handleByIndex(startIndex.current);
    }

    startIndex.current = null;
  };

  const end = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.releasePointerCapture(e.pointerId);
    endRafLoop();

    if (snapTimerRef.current !== null || dragRef.current === null) {
      return;
    }

    if (!infinite) {
      offsetRef.current -= dragRef.current * SWIPE_COEFF;
    } else {
      snapHandler();
    }

    dragRef.current = 0;
    startXRef.current = null;
    startIndex.current = null;
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

  // switch to 1 slide on resize
  useEffect(() => {
    handleByIndex(0);
  }, [width]);

  // clear timeout on timeout end
  useEffect(() => {
    return () => {
      if (snapTimerRef.current) {
        clearTimeout(snapTimerRef.current);
      }
    };
  }, []);

  return { handlers, handleByIndex, snapHandler };
};
