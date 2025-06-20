import { useEffect } from 'react';
import { useMSContext } from '../context/MSContext';

type Params = {
  setByIndex: (index: number, animation?: boolean) => void;
  getIndex: (offset: number, width: number) => number;
};

export const useResize = ({ setByIndex, getIndex }: Params) => {
  const { VP, width, offset } = useMSContext();

  useEffect(() => {
    if (!VP.current) {
      return;
    }

    const node = VP.current;
    const resizeObs = new ResizeObserver(() => {
      width.current = node.offsetWidth;
      const index = getIndex(offset.current, width.current);

      setByIndex(index);
    });

    resizeObs.observe(node);

    return () => {
      resizeObs.disconnect();
    };
  }, []);
};
