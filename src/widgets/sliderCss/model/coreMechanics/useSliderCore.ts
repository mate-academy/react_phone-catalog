/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect } from 'react';
import { manipulate } from '../helpers';
import { useSliderData } from '../';
import { useSliderUtils, useSliderMath, useAFLoop } from '.';
type Props = {
  amount: number;
};

//todo: fix resize fix initialOffset value;

export const useSliderCore = ({ amount }: Props) => {
  const { DOM, mechanics, ids, activeIndex, setActiveIndex, startIndex } =
    useSliderData();
  const { utils } = useSliderUtils();
  const { af } = useAFLoop();
  const { math } = useSliderMath();

  useLayoutEffect(() => {
    utils.updateSizes();
    manipulate.toggleTrackClass(DOM.track.current as HTMLDivElement, false);
  }, [DOM.item, DOM.viewport, DOM.track]);

  const animateTrack = (idx: number, animation: boolean) => {
    manipulate.toggleTrackClass(DOM.track.current as HTMLDivElement, animation);
    const newIdx = math.checkIndexClamp(idx, amount);

    math.updateOffset(newIdx);
    setActiveIndex(newIdx);
  };

  const handlers = {
    onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      manipulate.toggleTrackClass(DOM.track.current as HTMLDivElement, false);
      mechanics.startX.current = e.clientX;
      mechanics.dragging.current = false;
    },

    onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => {
      if (mechanics.startX.current === null) {
        return;
      }

      mechanics.drag.current = e.clientX - +mechanics.startX.current;
      if (!mechanics.dragging.current) {
        utils.setDrag(e);
      } else {
        af.start();
        math.clamp(amount);
        mechanics.startX.current = e.clientX;
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
      mechanics.startX.current = null;
      if (ids.pointerId.current !== null) {
        e.currentTarget.releasePointerCapture(ids.pointerId.current);
        ids.pointerId.current = null;
      }

      const newIndex = math.getNewIndex();

      animateTrack(newIndex, true);
      mechanics.drag.current = 0;
    },

    onPointerCancel: (e: React.PointerEvent<HTMLDivElement>) => {
      handlers.onPointerUp(e);
    },

    onButton: (mod: number) => {
      animateTrack(activeIndex + mod, true);
    },

    onPagination: (pos: number) => {
      animateTrack(pos + startIndex, true);
    },
  };

  useEffect(() => {
    return () => utils.cleanup();
  }, []);

  useEffect(() => {
    if (!DOM.viewport.current) {
      return;
    }

    const node = DOM.viewport.current;

    const resizeObserver = new ResizeObserver(() => {
      utils.updateSizes();
      animateTrack(1, false);
    });

    resizeObserver.observe(node);

    return () => {
      resizeObserver.disconnect();
    };
  }, [DOM.viewport]);

  return { handlers };
};
