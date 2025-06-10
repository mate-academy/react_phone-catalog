import { useCallback, useRef } from 'react';
import { useMSPContext } from '../context/useMSPContext';

export const useRafLoop = () => {
  const rafIdRef = useRef<number | null>(null);
  const { trackRef, offsetRef, isDraggingRef, dragRef, rerender, swipeCoeff } =
    useMSPContext();

  const toggleTrackClass = useCallback((prop: HTMLUListElement) => {
    prop.classList.toggle('swiper__track--dragging', isDraggingRef.current);
    prop.classList.toggle('swiper__track--animated', !isDraggingRef.current);
  }, []);

  const positionSetter = useCallback(() => {
    const transformValue = isDraggingRef.current
      ? `translateX(${-offsetRef.current + dragRef.current * swipeCoeff}px)`
      : `translateX(${-offsetRef.current}px)`;

    return transformValue;
  }, []);

  const loop = useCallback(() => {
    const track = trackRef.current as HTMLUListElement;

    toggleTrackClass(track);

    track.style.transform = positionSetter();
    rafIdRef.current = requestAnimationFrame(loop);
  }, []);

  const startRafLoop = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

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
