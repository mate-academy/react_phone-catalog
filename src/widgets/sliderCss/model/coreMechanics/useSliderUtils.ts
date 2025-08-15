/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
import { useCallback } from 'react';
import { useSliderData } from '../context/sliderContext';

export const useSliderUtils = () => {
  const dragThreshold = 3;
  const { DOM, measure, mechanics, ids } = useSliderData();
  const utils = {
    setDrag: useCallback((e: React.PointerEvent<HTMLDivElement>) => {
      if (Math.abs(mechanics.drag.current as number) > dragThreshold) {
        mechanics.dragging.current = true;
        ids.pointerId.current = e.pointerId;
        e.currentTarget.setPointerCapture(ids.pointerId.current);
      }
    }, []),
    updateSizes: useCallback(() => {
      const toUpdate = [
        { element: DOM.viewport, size: measure.VPWidth },
        { element: DOM.track, size: measure.trackWidth },
        { element: DOM.item, size: measure.itemWidth },
      ];

      toUpdate.forEach(el => {
        if (!el.element.current) {
          return;
        }

        el.size.current = el.element.current.offsetWidth;
      });
    }, []),
    cleanup: useCallback(() => {
      if (ids.pointerId.current !== null) {
        ids.pointerId.current = null;
      }
    }, []),
  };

  return { utils };
};
