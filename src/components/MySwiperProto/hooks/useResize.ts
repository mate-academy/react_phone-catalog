import { useEffect } from 'react';
import { useMSPContext } from '../context/useMSPContext';
type Props = {
  handleByIndex: (idx: number) => void;
};
export const useResize = ({ handleByIndex }: Props) => {
  const { VPRef, isDraggingRef, activeIndexRef, widthRef } = useMSPContext();

  useEffect(() => {
    if (!VPRef.current) {
      return;
    }

    const node = VPRef.current;
    const resizeObs = new ResizeObserver(() => {
      widthRef.current = node.offsetWidth;
      isDraggingRef.current = true;
      handleByIndex(activeIndexRef.current);
      isDraggingRef.current = false;
    });

    resizeObs.observe(node);

    return () => {
      resizeObs.disconnect();
    };
  }, []);
};
