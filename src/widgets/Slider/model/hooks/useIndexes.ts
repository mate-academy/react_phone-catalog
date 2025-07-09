import { useCallback } from 'react';
import { useSlContext } from '../context/sliderContext';

type Params = {
  gap: number;
  clampResolve: (val: number) => number;
};

export const useIndexes = ({ gap, clampResolve }: Params) => {
  const { offset, elWidth } = useSlContext();

  const getIndex = useCallback(
    (arg?: number) => {
      const mod = arg ? arg : offset.current;

      return Math.floor(mod / (elWidth.current + gap));
    },
    [gap, offset],
  );

  const setOffsetByIndex = useCallback(
    (idx: number) => {
      const potentialOffset = (elWidth.current + gap) * idx;

      offset.current = clampResolve(potentialOffset);
    },
    [clampResolve, gap, offset],
  );

  return { getIndex, setOffsetByIndex };
};
