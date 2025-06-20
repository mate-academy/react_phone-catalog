import { useLayoutEffect } from 'react';
import { useMSContext } from '../context/MSContext';
export const useInit = () => {
  const { VPRef, widthRef } = useMSContext();

  useLayoutEffect(() => {
    if (VPRef.current) {
      widthRef.current = VPRef.current.offsetWidth;
    }
  }, []);
};
