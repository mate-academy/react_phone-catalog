import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname, search } = useLocation();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      prevPathnameRef.current = pathname;
    }
  }, [pathname, search]);

  return null;
};
