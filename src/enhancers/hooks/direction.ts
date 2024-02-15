import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { LocationState } from './appLocation';

export const useDirection = () => {
  const { pathname } = useLocation();

  const getDirection = useCallback((path: string) => {
    return {
      pathname: path,
      state: {
        prevPage: pathname,
      } as LocationState,
    };
  }, [pathname]);

  return getDirection;
};
