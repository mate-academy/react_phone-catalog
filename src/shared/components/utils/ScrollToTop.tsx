import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, searchParams]);

  return null;
};
