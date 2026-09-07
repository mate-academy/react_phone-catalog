import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext, Theme } from './AppContext';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || 'light',
  );

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';

      localStorage.setItem('theme', next);

      return next;
    });
  };

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 640px)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsMenuOpen(false);
      }
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    if (mediaQuery.matches) {
      setIsMenuOpen(false);
    }

    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  const location = useLocation();

  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  const value = useMemo(
    () => ({ isMenuOpen, openMenu, closeMenu, theme, toggleTheme }),
    [isMenuOpen, theme],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
