import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const { search, pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollIntoView({
      behavior: 'instant',
      block: 'start',
    });
  }, [search, pathname]);
};
