import { useCallback } from 'react';
import { useMSContext } from '../context/MSContext';

export const useSafeCheck = () => {
  const { infinite, offset, width, listLength, gap } = useMSContext();

  const checker = useCallback(() => {
    if (
      infinite &&
      (offset.current < width.current * 2 + gap ||
        offset.current >
          width.current * (listLength + 1) + gap * (listLength + 2))
    ) {
      return false;
    }

    return true;
  }, []);

  return { checker };
};
