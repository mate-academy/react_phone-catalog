import { useEffect, RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (event: Event) => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const el = ref?.current;

      if (!el || el.contains((event.target as Node) || null)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener as EventListener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener as EventListener);
    };
  }, [ref, handler]);
};
