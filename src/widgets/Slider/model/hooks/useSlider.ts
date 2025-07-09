import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
} from 'react';
import { HooksConfig, VisualConfig } from '../../lib/types';
import { useSlContext } from '../context/sliderContext';
import { useAF } from './useAnimationFrame';
import { useSliderUtils } from './useSliderUtils';
import { useSnap } from './useSnap';
import { useIndexes } from './useIndexes';
import { useResize } from './useResize';
import { useInfinite } from './useInfinite';
import { Mode } from '../defaultConfig';

type Params = {
  hooksConfig: HooksConfig;
  visualConfig: VisualConfig;
};

//todo: add autoplay, add pagination

export const useSlider = ({ hooksConfig, visualConfig }: Params) => {
  const { offset, drag, VP, trackElement, vpWidth, elWidth, mode } =
    useSlContext();
  const startX = useRef<number | null>(null);
  const [tick, rerender] = useReducer(x => x + 1, 0);

  const updateSizes = useCallback(() => {
    vpWidth.current = VP.current?.offsetWidth ?? 0;
    elWidth.current = trackElement.current?.offsetWidth ?? 0;
  }, [VP, trackElement, vpWidth, elWidth]);

  useLayoutEffect(() => {
    updateSizes();
  }, [updateSizes]);

  const { swipeCoeff, threshold } = hooksConfig;
  const { gap } = visualConfig;
  const { toggleTrackClass, offsetCalc, translateRight, clampResolve } =
    useSliderUtils({ swipeCoeff, gap });

  const { getIndex, setOffsetByIndex } = useIndexes({ gap, clampResolve });

  const onFrame = useCallback(() => {
    translateRight(offsetCalc());
  }, [translateRight, offsetCalc]);

  const { startAF, stopAF } = useAF(onFrame);

  const { snapHandler } = useSnap(
    threshold,
    getIndex,
    setOffsetByIndex,
    offsetCalc,
  );

  const { infiniteHandler } = useInfinite({
    gap,
    setOffsetByIndex,
    toggleTrackClass,
    translateRight,
    getIndex,
  });

  useLayoutEffect(() => {
    if (mode === Mode.INFINITE) {
      setOffsetByIndex(1);
      toggleTrackClass(false);
      translateRight(offset.current);
    }
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

      snapHandler();
      drag.current = null;
      toggleTrackClass(true);
      translateRight(offset.current);
      startX.current = null;
      rerender();
    },
    [stopAF, snapHandler, toggleTrackClass, translateRight, drag, offset],
  );

  const handlers = {
    onPointerDown: start,
    onPointerMove: move,
    onPointerUp: end,
    onPointerCancel: end,
  };

  const onWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      drag.current = e.deltaX !== 0 ? -e.deltaX : -e.deltaY;

      toggleTrackClass(true);
      snapHandler();
      drag.current = null;
      toggleTrackClass(true);
      translateRight(offset.current);
      rerender();
    },
    [snapHandler, translateRight, toggleTrackClass, drag],
  );

  const onButton = useCallback(
    (mod: number) => {
      setOffsetByIndex(getIndex() + mod);
      toggleTrackClass(true);
      translateRight(offset.current);
      rerender();
    },
    [setOffsetByIndex, getIndex, toggleTrackClass, translateRight],
  );

  useEffect(() => {
    const port = VP.current as HTMLDivElement;

    port.addEventListener('wheel', onWheel, { passive: false });

    return () => port.removeEventListener('wheel', onWheel);
  }, [VP, drag, offset, onWheel]);

  const disableButton = useCallback(() => {
    return clampResolve(offset.current, true);
  }, []);

  useEffect(() => {
    if (mode === Mode.INFINITE) {
      infiniteHandler();
    }
  }, [tick]);

  useResize({
    updateSizes,
    getIndex,
    setOffsetByIndex,
    toggleTrackClass,
    translateRight,
  });

  return { handlers, onButton, disableButton };
};
