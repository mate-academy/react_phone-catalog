import { useCallback, useRef } from 'react';
import { useMSContext } from '../context/MSContext';

type Params = {
  swCoeff: number;
  toggleTrackClass: (track: HTMLUListElement, drag: null | number) => void;
  rerender: () => void;
};

export const useRafLoop = ({ swCoeff, toggleTrackClass, rerender }: Params) => {
  const rafIdRef = useRef<number | null>(null);
  const { trackRef, offsetRef, dragRef, widthRef } = useMSContext();

  const translate = (val: number) => {
    const track = trackRef.current as HTMLUListElement;

    track.style.transform = `translateX(${val}px`;
  };

  const loop = useCallback(() => {
    const transformValue =
      -offsetRef.current + (dragRef.current as number) * swCoeff;

    translate(transformValue);
    rafIdRef.current = requestAnimationFrame(loop);
  }, []);

  const endRafLoop = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  const startRafLoop = useCallback(() => {
    endRafLoop();

    loop();
  }, []);

  const setByIndex = useCallback(
    (index: number, animation: boolean = false) => {
      const shift = -index * widthRef.current;

      offsetRef.current = -shift;
      if (animation) {
        dragRef.current = null;
      } else {
        dragRef.current = 0;
      }

      toggleTrackClass(trackRef.current as HTMLUListElement, dragRef.current);
      translate(-offsetRef.current);
      rerender();
    },
    [],
  );

  const snapHandle = useCallback((startIndex: number) => {
    const treshold = 0.1 * widthRef.current;
    const step = (dragRef.current as number) < 0 ? 1 : -1;

    if (Math.abs(dragRef.current as number) > treshold) {
      setByIndex(startIndex + step, true);
    } else {
      setByIndex(startIndex, true);
    }
  }, []);

  return {
    startRafLoop,
    endRafLoop,
    snapHandle,
    setByIndex,
  };
};
