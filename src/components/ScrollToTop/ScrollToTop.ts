import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const scrollToTop = () =>
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return null;
};
