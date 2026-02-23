import { useEffect } from 'react';

export const useMenuCloseOnResize = (
  isOpen: boolean,
  onClose: () => void,
  breakpoint = 640,
) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= breakpoint && isOpen) {
        onClose();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, onClose, breakpoint]);
};
