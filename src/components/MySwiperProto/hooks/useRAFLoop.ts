import { useCallback, useRef } from 'react';
import { useMSPContext } from '../context/useMSPContext';

export const useRafLoop = () => {
  const rafIdRef = useRef<number | null>(null);
  const {
    trackRef,
    offsetRef,
    isDraggingRef,
    dragRef,
    rerender,
    swipeCoeff,
    activeIndexRef,
    infinite,
    widthRef,
  } = useMSPContext();

  const toggleTrackClass = () => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    track.classList.toggle('swiper__track--dragging', isDraggingRef.current);
    track.classList.toggle('swiper__track--animated', !isDraggingRef.current);
  };

  const startRafLoop = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    const loop = () => {
      if (trackRef.current) {
        const transformValue = isDraggingRef.current
          ? `translateX(${-offsetRef.current + dragRef.current * swipeCoeff}px)`
          : `translateX(${-offsetRef.current}px)`;

        toggleTrackClass();

        trackRef.current.style.transform = transformValue;
      }

      rafIdRef.current = requestAnimationFrame(loop);
      activeIndexRef.current = infinite
        ? Math.round(offsetRef.current / widthRef.current) - 1
        : Math.round(offsetRef.current / widthRef.current);
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

  return { startRafLoop, endRafLoop };
};
