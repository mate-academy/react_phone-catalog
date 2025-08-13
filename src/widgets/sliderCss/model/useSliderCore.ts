import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { manipulate } from './sliderMechanics';
type Props = {
  gap?: number;
  defaultIndex?: number;
  amount: number;
};

//todo: add resize, add autoloop? change: props

export const useSliderCore = ({ gap = 0, defaultIndex = 0, amount }: Props) => {
  const DOMRefs = {
    viewport: useRef<HTMLDivElement>(null),
    track: useRef<HTMLDivElement>(null),
    item: useRef<HTMLAnchorElement>(null),
  };

  const measureRefs = {
    VPWidth: useRef<number>(0),
    trackWidth: useRef<number>(0),
    currentIndex: useRef<number>(0),
    itemWidth: useRef<number>(0),
  };

  const mechRefs = {
    offset: useRef<number>(0),
    startX: useRef<number | null>(null),
    drag: useRef<number | null>(null),
    dragging: useRef<boolean>(false),
  };

  const idRefs = {
    rafId: useRef<number | null>(null),
    pointerId: useRef<number | null>(null),
  };
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const dragThreshold = 3;

  useLayoutEffect(() => {
    if (!DOMRefs.viewport.current) {
      return;
    }

    measureRefs.VPWidth.current = DOMRefs.viewport.current.offsetWidth;

    if (!DOMRefs.track.current) {
      return;
    }

    measureRefs.trackWidth.current = DOMRefs.track.current.offsetWidth;
    manipulate.toggleTrackClass(DOMRefs.track.current, false);
    if (!DOMRefs.item.current) {
      return;
    }

    measureRefs.itemWidth.current = DOMRefs.item.current.offsetWidth;
  }, [DOMRefs.item, DOMRefs.viewport, DOMRefs.track.current]);

  const afLoop = {
    start: () => {
      if (idRefs.rafId.current) {
        return;
      }

      const loop = () => {
        manipulate.moveTrack(
          DOMRefs.track.current as HTMLDivElement,
          mechRefs.offset.current,
        );
        idRefs.rafId.current = requestAnimationFrame(loop);
      };

      idRefs.rafId.current = requestAnimationFrame(loop);
    },
    stop: () => {
      if (idRefs.rafId.current) {
        cancelAnimationFrame(idRefs.rafId.current);
        idRefs.rafId.current = null;
      }
    },
  };
  const utils = {
    setDrag: useCallback((e: React.PointerEvent<HTMLDivElement>) => {
      if (Math.abs(mechRefs.drag.current as number) > dragThreshold) {
        mechRefs.dragging.current = true;
        idRefs.pointerId.current = e.pointerId;
        e.currentTarget.setPointerCapture(idRefs.pointerId.current);
      }
    }, []),

    cleanup: useCallback(() => {
      if (idRefs.rafId.current !== null) {
        afLoop.stop();
        idRefs.rafId.current = null;
      }

      if (idRefs.pointerId.current !== null) {
        idRefs.pointerId.current = null;
      }
    }, []),

    getIndex: useCallback(() => {
      return -mechRefs.offset.current / (measureRefs.itemWidth.current + gap);
    }, []),

    getNewIndex: () => {
      const idx = utils.getIndex();

      if ((mechRefs.drag.current as number) > 0) {
        return Math.floor(idx);
      }

      return Math.ceil(idx);
    },

    updateOffset: useCallback((newIdx: number) => {
      mechRefs.offset.current = -newIdx * (gap + measureRefs.itemWidth.current);
    }, []),

    checkClamp: useCallback(
      (arg: number) => {
        if (arg < 0) {
          return amount - 1;
        }

        if (arg >= amount) {
          return 0;
        }

        return arg;
      },
      [amount],
    ),
  };

  const handlers = {
    onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      manipulate.toggleTrackClass(
        DOMRefs.track.current as HTMLDivElement,
        false,
      );
      mechRefs.startX.current = e.clientX;
      mechRefs.dragging.current = false;
    },

    onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => {
      if (mechRefs.startX.current === null) {
        return;
      }

      mechRefs.drag.current = e.clientX - +mechRefs.startX.current;
      if (!mechRefs.dragging.current) {
        utils.setDrag(e);
      } else {
        afLoop.start();
        mechRefs.offset.current += mechRefs.drag.current;
        mechRefs.startX.current = e.clientX;
      }
    },

    onClick: (e: React.MouseEvent) => {
      if (mechRefs.dragging.current) {
        e.preventDefault();
        e.stopPropagation();
        mechRefs.dragging.current = false;
      }
    },

    onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => {
      afLoop.stop();
      mechRefs.startX.current = null;
      if (idRefs.pointerId.current !== null) {
        e.currentTarget.releasePointerCapture(idRefs.pointerId.current);
        idRefs.pointerId.current = null;
      }

      const newIndex = utils.getNewIndex();

      const clampedIndex = utils.checkClamp(newIndex);

      manipulate.toggleTrackClass(
        DOMRefs.track.current as HTMLDivElement,
        true,
      );
      utils.updateOffset(clampedIndex);
      setActiveIndex(clampedIndex);
      mechRefs.drag.current = 0;
    },

    onPointerCancel: (e: React.PointerEvent<HTMLDivElement>) => {
      handlers.onPointerUp(e);
    },
  };

  useEffect(() => {
    utils.cleanup();
  }, []);

  return { DOMRefs, measureRefs, mechRefs, handlers, activeIndex };
};
