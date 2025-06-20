import { useLayoutEffect } from 'react';
import { useMSContext } from '../context/MSContext';
export const useInit = () => {
  const { VPRef, widthRef, infinite, offsetRef } = useMSContext();

  useLayoutEffect(() => {
    if (VPRef.current) {
      widthRef.current = VPRef.current.offsetWidth;

      if (infinite) {
        offsetRef.current = widthRef.current * 2;
      }
    }
  }, []);
};
