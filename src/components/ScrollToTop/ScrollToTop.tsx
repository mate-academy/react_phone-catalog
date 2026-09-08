import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const currentPath = location.pathname;

    if (prevPathRef.current !== currentPath) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      prevPathRef.current = currentPath;
    }
  }, [location.pathname]);

  return null;
};
