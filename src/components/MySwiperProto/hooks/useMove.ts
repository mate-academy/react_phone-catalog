import { useCallback, useRef } from 'react';
import { useMSPContext } from '../context/useMSPContext';
import { positionSet, toggleClass } from '../helpers/trackManipulations';
export const useMove = () => {
  const { trackRef, offsetRef, isDraggingRef, dragRef, rerender, swipeCoeff } =
    useMSPContext();

  // #region RafLoop
  const rafIdRef = useRef<number | null>(null);

  const loop = useCallback(() => {
    const track = trackRef.current as HTMLUListElement;

    toggleClass(track, isDraggingRef.current);

    track.style.transform = positionSet(
      isDraggingRef.current,
      offsetRef.current,
      dragRef.current,
      swipeCoeff,
    );
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
