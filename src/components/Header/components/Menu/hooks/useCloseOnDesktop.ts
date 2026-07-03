import { useEffect } from 'react';

export function useCloseOnDesktop(onClose: () => void, breakpoint = 640) {
  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${breakpoint}px)`);

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        onClose();
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [onClose, breakpoint]);
}
