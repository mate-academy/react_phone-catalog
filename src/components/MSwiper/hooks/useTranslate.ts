import { useCallback, useRef } from 'react';
import { useMSContext } from '../context/MSContext';

type Params = {
  swCoeff: number;
  toggleTrackClass: (track: HTMLUListElement, drag: null | number) => void;
  rerender: () => void;
  treshold: number;
  gap: number;
};

export const useRafLoop = ({
  swCoeff,
  toggleTrackClass,
  rerender,
  treshold,
  gap,
}: Params) => {
  const rafId = useRef<number | null>(null);
  const { track, offset, drag, width } = useMSContext();

  const translate = (val: number) => {
    const trackLi = track.current as HTMLUListElement;

    trackLi.style.transform = `translateX(${val}px`;
  };

  const loop = useCallback(() => {
    const transformValue = -offset.current + (drag.current as number) * swCoeff;

    translate(transformValue);
    rafId.current = requestAnimationFrame(loop);
  }, []);

  const endRafLoop = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }, []);

  const startRafLoop = useCallback(() => {
    endRafLoop();

    loop();
  }, []);

  const setByIndex = useCallback(
    (index: number, animation: boolean = false) => {
      const shift = -index * width.current - gap * Math.abs(index);

      offset.current = -shift;
      if (animation) {
        drag.current = null;
      } else {
        drag.current = 0;
      }

      toggleTrackClass(track.current as HTMLUListElement, drag.current);
      translate(-offset.current);
      rerender();
    },
    [],
  );

  const snapHandle = useCallback((startIndex: number) => {
    const trh = treshold * width.current;
    const step = (drag.current as number) < 0 ? 1 : -1;

    if (Math.abs(drag.current as number) > trh) {
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
