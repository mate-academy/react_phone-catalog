import { useEffect } from 'react';
type Handler = (target: EventTarget | null) => void;
export default function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  handler: Handler,
) {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target;

      if (!ref.current) {
        return;
      }

      if (!ref.current.contains(target as Node)) {
        handler(target);
      }
    }

    document.addEventListener('click', onClick);

    return () => document.removeEventListener('click', onClick);
  }, [ref, handler]);
}
