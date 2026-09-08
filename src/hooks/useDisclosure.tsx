import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface DisclosureOption {
  closeOnLocationChange?: boolean;
  lockScroll?: boolean;
}

export const useDisclosure = (
  initialState: boolean = false,
  options: DisclosureOption = {},
) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const location = useLocation();

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(curState => !curState);

  const { closeOnLocationChange, lockScroll } = options;

  useEffect(() => {
    if (isOpen && closeOnLocationChange) {
      close();
    }
  }, [closeOnLocationChange, location]);

  useEffect(() => {
    if (!lockScroll) {
      return;
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [lockScroll, isOpen]);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};
