import { useEffect, RefObject, useRef } from 'react';

/**
 * Custom hook to handle closing a component when the mouse leaves its area.
 * Includes a delay (grace period) and accessibility support (Escape key).
 */


export const useMouseLeave = (
  ref: RefObject<HTMLElement>,
  handler: () => void,
  isActive: boolean,
  delay = 400,
) => {
  // Reference to the active timer to allow clearing it if the mouse returns
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isActive || !ref.current) return;

    const node = ref.current;

    // --- MOUSE ENTER ---
    // If the user returns to the element before the delay ends, cancel the close action
    const handleMouseEnter = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    // --- MOUSE LEAVE ---
    // Start a timer when the mouse leaves. Trigger the handler after the delay.
    const handleMouseLeave = () => {
      timerRef.current = setTimeout(() => {
        handler();
      }, delay);
    };

    // --- ACCESSIBILITY ---
    // Allow users to close the component using the Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handler();
    };

    // Attach listeners to the specific node and the global document
    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('keydown', handleKeyDown);

    // --- CLEANUP ---
    // Important: Remove all listeners and clear timers when the component unmounts or becomes inactive
    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('keydown', handleKeyDown);
      
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [ref, handler, isActive, delay]);
};
