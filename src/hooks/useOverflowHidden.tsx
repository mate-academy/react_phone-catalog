import { useEffect } from 'react';

export const useOverflowHidden = (isOpen: boolean) => {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = prevOverflow;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);
};
