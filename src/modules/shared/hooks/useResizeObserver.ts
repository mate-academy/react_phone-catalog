import { RefObject, useEffect } from 'react';

export function useResizeObserver(
  ref: RefObject<HTMLElement>,
  callback: (width: number) => void,
) {
  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver(() => {
      callback(element.clientWidth);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [callback, ref]);
}
