import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTopOnPhonePage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith('/phones/')) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};
