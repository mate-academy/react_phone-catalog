import { useEffect, RefObject, useRef } from 'react';

export const useMouseLeave = (
  ref: RefObject<HTMLElement>,
  handler: () => void,
  isActive: boolean,
  delay = 400,
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isActive || !ref.current) return;

    const node = ref.current;

    const handleMouseEnter = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const handleMouseLeave = () => {
      timerRef.current = setTimeout(() => {
        handler();
      }, delay);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handler();
    };

    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('keydown', handleKeyDown);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [ref, handler, isActive, delay]);
};
