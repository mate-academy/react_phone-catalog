import { useEffect } from 'react';
import { useMSPContext } from '../context/useMSPContext';
type Props = {
  handleByIndex: (idx: number) => void;
};
export const useResize = ({ handleByIndex }: Props) => {
  const { VPRef, setWidth, rerender, width, isDraggingRef, activeIndexRef } =
    useMSPContext();

  useEffect(() => {
    const node = VPRef.current;

    if (node === null) {
      return;
    }

    const resizeObs = new ResizeObserver(() => {
      setWidth(node.offsetWidth);
      isDraggingRef.current = true;
      handleByIndex(activeIndexRef.current);
      isDraggingRef.current = false;
    });

    resizeObs.observe(node);
    rerender();

    return () => {
      resizeObs.disconnect();
    };
  }, [width, activeIndexRef]);
};
