import { useCallback } from 'react';
import { useSlContext } from '../context/sliderContext';

export function useSnap(
  threshold: number,
  getIndex: (arg?: number) => number,
  setOffsetByIndex: (idx: number) => void,
  offsetCalc: () => number,
) {
  const { drag, offset, elWidth, vpWidth } = useSlContext();

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
  }, [drag, getIndex, setOffsetByIndex, offsetCalc, threshold, offset]);

  return { snapHandler };
}
