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

  const updateSize = {
    VPWidth: () => {
      if (!DOMRefs.viewport.current) {
        return;
      }

      measureRefs.VPWidth.current = DOMRefs.viewport.current.offsetWidth;
    },
    track: () => {
      if (!DOMRefs.track.current) {
        return;
      }

      measureRefs.trackWidth.current = DOMRefs.track.current.offsetWidth;
    },
    item: () => {
      if (!DOMRefs.item.current) {
        return;
      }

      measureRefs.itemWidth.current = DOMRefs.item.current.offsetWidth;
    },
    all: () => {
      updateSize.VPWidth();
      updateSize.track();
      updateSize.item();
    },
  };

  useLayoutEffect(() => {
    updateSize.all();
    manipulate.toggleTrackClass(DOMRefs.track.current as HTMLDivElement, false);
  }, [DOMRefs.item, DOMRefs.viewport, DOMRefs.track]);

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
    animateTrack: (idx: number, animation: boolean) => {
      manipulate.toggleTrackClass(
        DOMRefs.track.current as HTMLDivElement,
        animation,
      );
      const newIdx = utils.checkClamp(idx);

      utils.updateOffset(newIdx);
      setActiveIndex(newIdx);
    },
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

      utils.animateTrack(newIndex, true);
      mechRefs.drag.current = 0;
    },

    onPointerCancel: (e: React.PointerEvent<HTMLDivElement>) => {
      handlers.onPointerUp(e);
    },
    onButton: (mod: number) => {
      utils.animateTrack(activeIndex + mod, true);
    },
    onPagination: (pos: number) => {
      utils.animateTrack(pos, true);
    },
  };

  useEffect(() => {
    return () => utils.cleanup();
  }, []);

  useEffect(() => {
    if (!DOMRefs.viewport.current) {
      return;
    }

    const node = DOMRefs.viewport.current;

    const resizeObserver = new ResizeObserver(() => {
      updateSize.all();
      utils.animateTrack(activeIndex, false);
    });

    resizeObserver.observe(node);

    return () => {
      resizeObserver.disconnect();
    };
  }, [DOMRefs.viewport]);

  return { DOMRefs, measureRefs, mechRefs, handlers, activeIndex };
};
