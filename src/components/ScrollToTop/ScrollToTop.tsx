import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  // useLocation nasłuchuje zmian w ścieżce (np. zmiana z '/' na '/phones')
  const { pathname } = useLocation();

  useEffect(() => {
    // Przy każdej zmianie ścieżki (pathname), przewiń okno do góry (0, 0)
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
