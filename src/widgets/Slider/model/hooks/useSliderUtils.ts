/* eslint-disable no-param-reassign */
import { useSliderData, visualConfig } from '..';
import { useRef } from 'react';

export const useSliderUtils = (startIndex: number, amount: number) => {
  const dragThreshold = 3;
  const { gap } = visualConfig;
  const { DOM, measure, mechanics } = useSliderData();
  const id = {
    pointer: useRef<number | null>(null),
    raf: useRef<number | null>(null),
  };

  const drag = {
    set: (e: React.PointerEvent<HTMLDivElement>) => {
      if (Math.abs(mechanics.drag.current as number) > dragThreshold) {
        mechanics.dragging.current = true;
        id.pointer.current = e.pointerId;
        e.currentTarget.setPointerCapture(id.pointer.current);
      }
    },
    stop: (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.releasePointerCapture(id.pointer.current as number);
      id.pointer.current = null;
    },
  };

  const updateSizes = () => {
    const toUpdate = [
      { element: DOM.viewport, size: measure.VPWidth },
      { element: DOM.track, size: measure.trackWidth },
      { element: DOM.item, size: measure.itemWidth },
    ];

    toUpdate.forEach(el => {
      if (!el.element.current) {
        return;
      }

      // eslint-disable-next-line no-param-reassign
      el.size.current = el.element.current.offsetWidth;
    });
  };

  const math = {
    checkIndexClamp: (arg: number) => {
      if (arg < 0) {
        return 0;
      }

      if (arg >= amount + startIndex * 2) {
        return (
          amount -
          Math.ceil(measure.VPWidth.current / (measure.itemWidth.current + gap))
        );
      }

      return arg;
    },

    getNewIndex: () => {
      const idx = -mechanics.offset.current / (measure.itemWidth.current + gap);

      if ((mechanics.drag.current as number) > 0) {
        return math.checkIndexClamp(Math.floor(idx));
      }

      return math.checkIndexClamp(Math.ceil(idx));
    },

    dragClamp: () => {
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
  };

  return { drag, updateSizes, math };
};
