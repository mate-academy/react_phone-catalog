import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Category } from '../../../../types/Category';

export const useHeader = (categories: Category[]) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = useMemo(() => {
    return [
      { title: 'Home', path: '/', isEnd: true },
      ...categories.map(c => ({
        title: c.navTitle || c.title,
        path: c.path,
        isEnd: false,
      })),
    ];
  }, [categories]);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return {
    navLinks,
    isMenuOpen,
    toggleMenu,
    closeMenu,
  };
};
