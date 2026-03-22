import { useEffect, RefObject } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: () => void,
  isActive: boolean,
) => {
  useEffect(() => {
    if (!isActive) return;

    const listener = (event: MouseEvent | TouchEvent | KeyboardEvent) => {
      // Obsługa Escape
      if (event instanceof KeyboardEvent) {
        if (event.key === 'Escape') {
          handler();
        }
        return;
      }

      // Obsługa kliknięcia poza ref
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
      document.removeEventListener('keydown', listener);
    };
  }, [ref, handler, isActive]);
};
