import { useCallback } from 'react';
import { useSlContext } from '../context/sliderContext';

type Params = {
  gap: number;
  setOffsetByIndex: (idx: number) => void;
  toggleTrackClass: (anim?: boolean) => void;
  translateRight: (arg: number) => void;
  getIndex: (arg?: number) => number;
  rerender: React.DispatchWithoutAction;
};

export const useInfinite = ({
  gap,
  setOffsetByIndex,
  toggleTrackClass,
  translateRight,
  getIndex,
  rerender,
}: Params) => {
  const { CLONES, length, track, offset } = useSlContext();
  const trueLength = length - CLONES * 2;
  const MIN = CLONES - 1;
  const MAX = length - CLONES;

  const infiniteResolve = useCallback(
    (idx: number) => {
      if (idx <= MIN) {
        return trueLength + CLONES - 1;
      }

      if (idx >= MAX) {
        return 1;
      }

      return idx;
    },
    [gap, length],
  );

  function waitTransformEnd(el: HTMLElement): Promise<void> {
    return new Promise(resolve => {
      const handler = (e: TransitionEvent) => {
        if (e.propertyName !== 'transform') {
          return;
        }

        el.removeEventListener('transitionend', handler);
        resolve();
      };

      el.addEventListener('transitionend', handler, { once: true });
    });
  }

  const infiniteHandler = async () => {
    const res = infiniteResolve(getIndex());

    if (res !== 0) {
      await waitTransformEnd(track.current as HTMLUListElement);
      const updated = infiniteResolve(getIndex());

      setOffsetByIndex(updated);
      toggleTrackClass(false);
      translateRight(offset.current);
      rerender();
    }

    return;
  };

  const initialOffset = useCallback(() => {
    setOffsetByIndex(1);
    toggleTrackClass(false);
    translateRight(offset.current);
  }, []);

  return { infiniteHandler, initialOffset };
};
