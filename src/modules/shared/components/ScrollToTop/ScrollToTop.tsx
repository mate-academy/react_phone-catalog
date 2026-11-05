import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (state?.keepScroll) {
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, state]);

  return null;
};
