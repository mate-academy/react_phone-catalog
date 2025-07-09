import { useEffect } from 'react';
import { useSlContext } from '../context/sliderContext';

type Params = {
  updateSizes: () => void;
  getIndex: (arg?: number) => number;
  setOffsetByIndex: (idx: number) => void;
  toggleTrackClass: (anim?: boolean) => void;
  translateRight: (arg: number) => void;
};

export const useResize = ({
  updateSizes,
  getIndex,
  setOffsetByIndex,
  toggleTrackClass,
  translateRight,
}: Params) => {
  const { offset, VP } = useSlContext();

  useEffect(() => {
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
  }, [
    VP,
    getIndex,
    setOffsetByIndex,
    updateSizes,
    toggleTrackClass,
    offset,
    translateRight,
  ]);
};
