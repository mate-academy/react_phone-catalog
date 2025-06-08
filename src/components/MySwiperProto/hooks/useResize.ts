import { useEffect } from 'react';
import { useSwiperContext } from '../context/MSPContext';

export const useResize = () => {
  const { VPRef, setWidth, rerender } = useSwiperContext();

  useEffect(() => {
    if (VPRef.current) {
      const node = VPRef.current;

      const resizeObs = new ResizeObserver(() => setWidth(node.offsetWidth));

      resizeObs.observe(node);
      rerender();
    }
  }, []);
};
