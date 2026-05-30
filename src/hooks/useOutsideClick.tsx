import { useEffect, useRef } from 'react';

export function useOutsideClick<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [callback]);

  return ref;
}
