import { useCallback } from 'react';
import { useSlContext } from '../context/sliderContext';

type Params = {
  getIndex: (arg?: number) => number;
  setOffsetByIndex: (idx: number) => void;
  toggleTrackClass: (anim?: boolean) => void;
  translateRight: (arg: number) => void;
};

export const useResize = ({
  getIndex,
  setOffsetByIndex,
  toggleTrackClass,
  translateRight,
}: Params) => {
  const { offset, VP, vpWidth, elWidth, trackElement } = useSlContext();

  const updateSizes = () => {
    vpWidth.current = VP.current?.offsetWidth ?? 0;
    elWidth.current = trackElement.current?.offsetWidth ?? 0;
  };

  const resize = useCallback(() => {
    const node = VP.current as HTMLDivElement;

    if (node === null) {
      return;
    }

    const resizeObs = new ResizeObserver(() => {
      updateSizes();
      setOffsetByIndex(getIndex());
      toggleTrackClass(false);
      translateRight(offset.current);
    });

    resizeObs.observe(node);

    return () => {
      resizeObs.disconnect();
    };
  }, [getIndex, setOffsetByIndex, toggleTrackClass, offset, translateRight]);

  return { resize, updateSizes };
};
