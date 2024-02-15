import { useEffect, useRef } from 'react';

type OnEntryChange = (entry: ResizeObserverEntry) => void;

export function useResizeObserver<T extends HTMLElement>(
  onEntryChange: OnEntryChange,
  deps: unknown[] = [],
): React.RefObject<T> {
  const nodeRef = useRef<T>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(onEntryChange);
    });

    if (nodeRef.current) {
      resizeObserver.observe(nodeRef.current);
    }

    return () => {
      if (nodeRef.current) {
        resizeObserver.disconnect();
      }
    };
  }, [nodeRef.current, ...deps]);

  return nodeRef;
}
