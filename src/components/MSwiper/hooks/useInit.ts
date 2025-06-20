import { useLayoutEffect } from 'react';
import { useMSContext } from '../context/MSContext';
export const useInit = () => {
  const { VP, width, infinite, offset } = useMSContext();

  useLayoutEffect(() => {
    if (VP.current) {
      width.current = VP.current.offsetWidth;

      if (infinite) {
        offset.current = width.current * 2;
      }
    }
  }, []);
};
