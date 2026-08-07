import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useMobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isMenuOpen]);

  return { isMenuOpen, setIsMenuOpen };
};
