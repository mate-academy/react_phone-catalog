import { useCallback, useEffect, useRef } from 'react';
import { useSwiperContext } from '../context/MSPContext';
import { Autoplay, Direction } from '../types/MSPtypes';

type Props = {
  clamp: boolean;
  autoplay: Autoplay | false;
  animationSpeed: number;
};

//                      TODO: add snap mode, correct positioning if gap
export const useSwiperCore = ({ clamp, autoplay, animationSpeed }: Props) => {
  const startXRef = useRef<number | null>(null);
  const startIndex = useRef<number | null>(null);
  const dragRef = useRef<number>(0);
  const isDraggingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayCountRef = useRef<number>(0);
  const snapTimerRef = useRef<NodeJS.Timeout | null>(null);
  const {
    trackRef,
    offsetRef,
    rerender,
    width,
    activeIndexRef,
    infinite,
    listLength,
  } = useSwiperContext();

  // #region helpers and const, raf loop
  const SWIPE_COEFF = 1.2;

  const toggleTrackClass = () => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    track.classList.toggle('swiper__track--dragging', isDraggingRef.current);
    track.classList.toggle('swiper__track--animated', !isDraggingRef.current);
  };

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

    rerender();
  }, []);
  // #endregion

  const firstStageTransition = useCallback(
    (newIndex: number, newOffset: number) => {
      activeIndexRef.current = newIndex;
      offsetRef.current = newOffset;
      startRafLoop();
      endRafLoop();
    },
    [],
  );

  const secondStageTransition = useCallback(
    (newIndex: number, newOffset: number) => {
      snapTimerRef.current = setTimeout(() => {
        isDraggingRef.current = true;
        activeIndexRef.current = newIndex;
        offsetRef.current = newOffset;
        startRafLoop();
        endRafLoop();
        isDraggingRef.current = false;
        snapTimerRef.current = null;
      }, animationSpeed);
    },
    [],
  );

  //#endregion

  // #region Handlers
  const start = (e: React.PointerEvent<HTMLDivElement>) => {
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
  };

  const handleByIndex = (idx: number) => {
    offsetRef.current = infinite ? (idx + 1) * width : idx * width;
    startRafLoop();
    endRafLoop();
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

  const buttonHandler = useCallback(
    (dir: Direction) => {
      const mod = dir === Direction.LEFT ? -1 : 1;
      const newIndex = activeIndexRef.current + mod;

      if (infinite) {
        if (newIndex < 0) {
          handleByIndex(newIndex);
          secondStageTransition(listLength - 1, listLength * width);
        } else if (newIndex > listLength - 1) {
          handleByIndex(newIndex);
          secondStageTransition(0, width);
        } else {
          handleByIndex(newIndex);
        }
      }

      if (newIndex < 0 || newIndex > listLength - 1) {
        return;
      }

      handleByIndex(newIndex);
    },
    [width],
  );

  const snapHandler = () => {
    if (startIndex.current === null || dragRef.current === null) {
      return;
    }

    const treshold = width / 10;
    const step = dragRef.current < 0 ? 1 : -1;
    const isFirst = activeIndexRef.current <= 0 && step === -1;
    const isLast = activeIndexRef.current >= listLength - 1 && step === 1;

    if (Math.abs(dragRef.current) > treshold) {
      dragRef.current = 0;
      isDraggingRef.current = false;
      if (isFirst && step === -1) {
        firstStageTransition(-1, 0);
        secondStageTransition(listLength - 1, listLength * width);
      } else if (isLast && step === 1) {
        firstStageTransition(listLength, (listLength + 1) * width);
        secondStageTransition(0, width);
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

  //autoplay
  useEffect(() => {
    const cleanup = () => {
      if (autoPlayTimerRef.current !== null) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
    };

    cleanup();

    if (!autoplay) {
      return;
    }

    const { direction, delay, times } = autoplay;

    autoPlayTimerRef.current = setInterval(() => {
      if (!isDraggingRef.current) {
        buttonHandler(direction);
        autoPlayCountRef.current += 1;
        if (autoPlayCountRef.current >= times) {
          cleanup();
        }
      }
    }, delay);

    return cleanup;
  }, [autoplay, buttonHandler]);

  return { handlers, handleByIndex, buttonHandler };
};
