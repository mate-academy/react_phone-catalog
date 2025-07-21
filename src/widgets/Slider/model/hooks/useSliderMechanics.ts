import { useCallback } from 'react';
import { useSlContext } from '../context/sliderContext';
import styles from '../../styles/basicSlider.module.scss';

type Params = {
  swipeCoeff: number;
  gap: number;
  threshold: number;
};

export const useSliderUtils = ({ swipeCoeff, gap, threshold }: Params) => {
  const { track, offset, drag, length, vpWidth, elWidth } = useSlContext();

  const toggleTrackClass = useCallback(
    (anim: boolean = false) => {
      const el = track.current as HTMLUListElement;

      el.classList.toggle(styles['carousel--animated'], anim);
      el.classList.toggle(styles['carousel--immediate'], !anim);
    },
    [track],
  );

  const clampResolve = useCallback((val: number, btn: boolean = false) => {
    if (val <= 0) {
      return 0;
    }

    const max = (elWidth.current + gap) * length - (vpWidth.current + gap);

    if (val >= max) {
      return btn === false ? max : 1;
    }

    return val;
  }, []);

  const offsetCalc = useCallback(() => {
    const ofs = offset.current - (drag.current ? drag.current * swipeCoeff : 0);

    return clampResolve(ofs);
  }, [clampResolve, drag, offset]);

  const translateRight = useCallback(
    (arg: number) => {
      const tr = track.current as HTMLUListElement;

      tr.style.transform = `translateX(-${arg}px)`;
    },
    [track],
  );

  const getIndex = useCallback(
    (arg?: number) => {
      const mod = arg ? arg : offset.current;

      return Math.floor(mod / (elWidth.current + gap));
    },
    [offset],
  );

  const setOffsetByIndex = useCallback(
    (idx: number) => {
      const potentialOffset = (elWidth.current + gap) * idx;

      offset.current = clampResolve(potentialOffset);
    },
    [clampResolve, offset],
  );

  const snapHandler = useCallback(() => {
    const drg = drag.current as number;
    const dirMod = drg > 0 ? -1 : 1;
    const thresholdCheck = Math.abs(drg) > vpWidth.current * threshold ? 1 : 0;

    if (elWidth.current > vpWidth.current * 0.9) {
      setOffsetByIndex(dirMod * thresholdCheck + getIndex());
    } else {
      offset.current = offsetCalc();
      setOffsetByIndex(getIndex(offset.current as number) + dirMod);
    }
  }, [getIndex, setOffsetByIndex, offsetCalc]);

  return {
    toggleTrackClass,
    offsetCalc,
    translateRight,
    clampResolve,
    getIndex,
    setOffsetByIndex,
    snapHandler,
  };
};
