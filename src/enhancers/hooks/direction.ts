import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const useDirection = () => {
  const { pathname } = useLocation();

  const getDirection = useCallback((path: string) => {
    return {
      pathname: path,
      state: {
        prevPage: pathname,
      },
    };
  }, [pathname]);

  return getDirection;
};
