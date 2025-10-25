import { useEffect } from 'react';

export function useElementWidth(
  ref: React.RefObject<HTMLElement>,
  callback: (width: number) => void,
) {
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      callback(entry.contentRect.width);
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, callback]);
}
