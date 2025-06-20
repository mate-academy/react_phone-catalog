import { useEffect } from 'react';
import { useMSContext } from '../context/MSContext';

type Params = {
  setByIndex: (index: number, animation?: boolean) => void;
  getIndex: (offset: number, width: number) => number;
};

export const useResize = ({ setByIndex, getIndex }: Params) => {
  const { VPRef, widthRef, offsetRef } = useMSContext();

  useEffect(() => {
    if (!VPRef.current) {
      return;
    }

    const node = VPRef.current;
    const resizeObs = new ResizeObserver(() => {
      widthRef.current = node.offsetWidth;
      const index = getIndex(offsetRef.current, widthRef.current);

      setByIndex(index);
    });

    resizeObs.observe(node);

    return () => {
      resizeObs.disconnect();
    };
  }, []);
};
