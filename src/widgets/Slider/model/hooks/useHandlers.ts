import { useCallback, useRef } from 'react';
import { useSlContext } from '../context/sliderContext';
import { useAF } from './useAnimationFrame';

type Params = {
  toggleTrackClass: (anim?: boolean) => void;
  snapHandler: () => void;
  translateRight: (arg: number) => void;
  getIndex: (arg?: number) => number;
  setOffsetByIndex: (idx: number) => void;
  offsetCalc: () => number;
  rerender: React.DispatchWithoutAction;
};

export const useSliderHandlers = ({
  toggleTrackClass,
  snapHandler,
  translateRight,
  getIndex,
  setOffsetByIndex,
  offsetCalc,
  rerender,
}: Params) => {
  const startX = useRef<number | null>(null);
  const { drag, offset } = useSlContext();

  const onFrame = useCallback(() => {
    translateRight(offsetCalc());
  }, [translateRight, offsetCalc]);

  const { startAF, stopAF } = useAF(onFrame);

  const finishBundle = useCallback((snap: boolean) => {
    if (snap) {
      snapHandler();
      drag.current = null;
    }

    toggleTrackClass(true);
    translateRight(offset.current);
    startX.current = null;
    rerender();
  }, []);

  const start = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      startX.current = e.clientX;
      toggleTrackClass(false);
      startAF();
    },
    [startAF, toggleTrackClass],
  );

  const move = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (startX.current === null) {
        return;
      }

      e.currentTarget.setPointerCapture(e.pointerId);

      drag.current = e.clientX - startX.current;
    },
    [drag],
  );

  const end = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (startX.current === null) {
        return;
      }

      e.currentTarget.releasePointerCapture(e.pointerId);

      stopAF();

      finishBundle(true);
    },
    [stopAF, snapHandler, toggleTrackClass, translateRight, drag, offset],
  );

  const onWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      drag.current = e.deltaX !== 0 ? -e.deltaX : -e.deltaY;

      finishBundle(true);
    },
    [snapHandler, translateRight, toggleTrackClass, drag],
  );

  const onButton = useCallback(
    (mod: number) => {
      setOffsetByIndex(getIndex() + mod);
      finishBundle(false);
    },
    [setOffsetByIndex, getIndex, toggleTrackClass, translateRight],
  );

  const paginationHandler = useCallback((pos: number) => {
    setOffsetByIndex(pos);
    finishBundle(false);
  }, []);

  const handlers = {
    onPointerDown: start,
    onPointerMove: move,
    onPointerUp: end,
    onPointerCancel: end,
  };

  return { handlers, onButton, onWheel, paginationHandler };
};
