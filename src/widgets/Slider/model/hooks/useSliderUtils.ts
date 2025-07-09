import { useCallback, useMemo } from 'react';
import { useSlContext } from '../context/sliderContext';
import styles from '../../ui/carousel/carousel.module.scss';

type Params = {
  swipeCoeff: number;
  gap: number;
};

export const useSliderUtils = ({ swipeCoeff, gap }: Params) => {
  const { track, offset, drag, length, vpWidth, elWidth } = useSlContext();

  const toggleTrackClass = useCallback(
    (anim: boolean = false) => {
      const el = track.current as HTMLUListElement;

      el.classList.toggle(styles['carousel--animated'], anim);
      el.classList.toggle(styles['carousel--immediate'], !anim);
    },
    [track],
  );

  const clampResolve = useCallback(
    (val: number, btn: boolean = false) => {
      if (val <= 0) {
        return 0;
      }

      const max = (elWidth.current + gap) * length - (vpWidth.current + gap);

      if (val >= max) {
        return btn === false ? max : 1;
      }

      return val;
    },
    [gap, length],
  );

  const offsetCalc = useCallback(() => {
    const ofs = offset.current - (drag.current ? drag.current * swipeCoeff : 0);

    return clampResolve(ofs);
  }, [clampResolve, swipeCoeff, drag, offset]);

  const translateRight = useCallback(
    (arg: number) => {
      const tr = track.current as HTMLUListElement;

      tr.style.transform = `translateX(-${arg}px)`;
    },
    [track],
  );

  return useMemo(
    () => ({ toggleTrackClass, offsetCalc, translateRight, clampResolve }),
    [toggleTrackClass, offsetCalc, translateRight, clampResolve],
  );
};
