import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleToggleSidebar = useCallback(() => {
    setIsOpen(curState => !curState);
  }, []);

  return { isOpen, handleToggleSidebar };
};
