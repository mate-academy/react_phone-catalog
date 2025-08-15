/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';
import { useSliderData } from '../context/sliderContext';

export const useSliderMath = () => {
  const { measure, mechanics, gap } = useSliderData();

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

    checkClamp: useCallback((arg: number, amount: number) => {
      if (arg < 0) {
        return amount - 1;
      }

      if (arg >= amount) {
        return 0;
      }

      return arg;
    }, []),
  };

  return { math };
};
