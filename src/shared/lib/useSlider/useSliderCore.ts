/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useSliderUtils } from './useSliderUtils';
import { useAnimation } from './useAnimation';
import { useSliderData } from './sliderContext';

export const useSliderCore = (amount: number, gap: number) => {
  const { DOM, mechanics, startIndex } = useSliderData();
  const { toggleTrackClass, snap, af } = useAnimation(gap);
  const { drag, updateSizes, math } = useSliderUtils(startIndex, amount, gap);
  const initialSetup = useRef<boolean>(false);
  const startX = useRef<number | null>(null);

  useLayoutEffect(() => {
    updateSizes();
    if (initialSetup.current) {
      return;
    }

    snap(startIndex, false);
    initialSetup.current = true;
  }, [DOM.item, DOM.viewport, DOM.track]);

  const setByIndex = (idx: number, clamped: boolean = false) => {
    let newIdx = idx;

    if (clamped) {
      newIdx = math.checkIndexClamp(idx);
    }

    snap(newIdx, true);
  };

  const handlers = {
    onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      toggleTrackClass(false);
      startX.current = e.clientX;
      mechanics.dragging.current = false;
    },

    onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => {
      if (startX.current === null) {
        return;
      }

      mechanics.drag.current = e.clientX - +startX.current;
      if (!mechanics.dragging.current) {
        drag.set(e);
      } else {
        af.start();
        math.dragClamp();
        startX.current = e.clientX;
      }
    },

    onClick: (e: React.MouseEvent) => {
      if (mechanics.dragging.current) {
        e.preventDefault();
        e.stopPropagation();
        mechanics.dragging.current = false;
      }
    },

    onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => {
      af.stop();
      startX.current = null;

      drag.stop(e);

      snap(math.getNewIndex(), true);
      mechanics.drag.current = null;
    },

    onPointerCancel: (e: React.PointerEvent<HTMLDivElement>) => {
      handlers.onPointerUp(e);
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          setByIndex(mechanics.index.current - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          setByIndex(mechanics.index.current + 1);
          break;
      }
    },
  };

  useEffect(() => {
    if (!DOM.viewport.current) {
      return;
    }

    const node = DOM.viewport.current;

    const resizeObserver = new ResizeObserver(() => {
      updateSizes();

      snap(mechanics.index.current, false);
    });

    resizeObserver.observe(node);

    return () => {
      resizeObserver.disconnect();
    };
  }, [DOM.viewport]);

  return { handlers, setByIndex };
};
