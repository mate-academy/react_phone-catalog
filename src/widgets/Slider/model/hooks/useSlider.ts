import { useCallback, useEffect, useLayoutEffect, useReducer } from 'react';
import { HooksConfig, Mode } from '../../types/types';
import { useSlContext } from '../context/sliderContext';
import { useSliderUtils, useResize, useInfinite, useSliderHandlers } from './';

type Params = {
  hooksConfig: HooksConfig;
};

//todo: add autoplay, add pagination
// move helpers to /model
// naming
// style DEPs

export const useSlider = ({ hooksConfig }: Params) => {
  const { swipeCoeff, threshold, gap } = hooksConfig;

  const [tick, rerender] = useReducer(x => x + 1, 0);

  const { offset, drag, VP, mode } = useSlContext();

  const {
    toggleTrackClass,
    offsetCalc,
    translateRight,
    clampResolve,
    getIndex,
    setOffsetByIndex,
    snapHandler,
  } = useSliderUtils({ swipeCoeff, gap, threshold });

  const { updateSizes, resize } = useResize({
    getIndex,
    setOffsetByIndex,
    toggleTrackClass,
    translateRight,
  });

  useLayoutEffect(() => {
    updateSizes();
    rerender();
  }, []);

  const { infiniteHandler, initialOffset } = useInfinite({
    gap,
    setOffsetByIndex,
    toggleTrackClass,
    translateRight,
    getIndex,
    rerender,
  });

  useLayoutEffect(() => {
    if (mode === Mode.INFINITE) {
      initialOffset();
    }
  }, []);

  const { handlers, onButton, onWheel, paginationHandler } = useSliderHandlers({
    toggleTrackClass,
    snapHandler,
    translateRight,
    getIndex,
    setOffsetByIndex,
    offsetCalc,
    rerender,
  });

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

  useEffect(() => {
    resize();
  }, []);

  return { handlers, onButton, disableButton, paginationHandler, getIndex };
};
