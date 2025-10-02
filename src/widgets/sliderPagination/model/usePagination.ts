import { useSliderData } from '@shared/lib';
import { useMemo } from 'react';

export const usePagination = (amount: number) => {
  const { mechanics } = useSliderData();

  const dataIDs = useMemo(
    () => Array.from({ length: amount }, (_, i) => i),
    [amount],
  );

  const getCurrent = (id: number) => {
    const mod = id + 1;

    if (mechanics.index.current > dataIDs.length) {
      return mod === 1;
    }

    if (mechanics.index.current < 1) {
      return mod === dataIDs.length;
    }

    return mod === mechanics.index.current;
  };

  return { getCurrent, dataIDs };
};
