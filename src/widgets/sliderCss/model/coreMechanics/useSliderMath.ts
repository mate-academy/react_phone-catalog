/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';
import { useSliderData } from '../context/sliderContext';

export const useSliderMath = () => {
  const { measure, mechanics, gap, startIndex } = useSliderData();

  const math = {
    getIndex: useCallback(() => {
      return -mechanics.offset.current / (measure.itemWidth.current + gap);
    }, []),

    getNewIndex: () => {
      const idx = math.getIndex();

      if ((mechanics.drag.current as number) > 0) {
        return Math.floor(idx);
      }

      return Math.ceil(idx);
    },

    updateOffset: useCallback((newIdx: number) => {
      mechanics.offset.current = -newIdx * (gap + measure.itemWidth.current);
    }, []),

    clamp: (amount: number) => {
      const potentialOffset =
        mechanics.offset.current + (mechanics.drag.current as number);
      const max =
        -(measure.itemWidth.current + gap) * (amount - 1 + startIndex * 2);

      if (potentialOffset < max) {
        mechanics.offset.current = max;
      } else if (potentialOffset > 0) {
        mechanics.offset.current = 0;
      } else {
        mechanics.offset.current = potentialOffset;
      }
    },

    checkIndexClamp: useCallback((arg: number, amount: number) => {
      if (arg < 0) {
        return amount;
      }

      if (arg >= amount + startIndex * 2) {
        return startIndex;
      }

      return arg;
    }, []),
  };

  return { math };
};
