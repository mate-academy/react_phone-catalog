import { useLayoutEffect } from 'react';
import { useMSPContext } from '../context/useMSPContext';

export const useInitialRerender = () => {
  const { VPRef, widthRef, offsetRef, infinite } = useMSPContext();

  useLayoutEffect(() => {
    if (VPRef.current) {
      widthRef.current = VPRef.current.offsetWidth;
      offsetRef.current = infinite ? widthRef.current : 0;
    }
  }, []);
};
