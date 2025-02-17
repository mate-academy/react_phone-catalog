import { useLocation } from 'react-router-dom';

export const useLoweredLocation = () => {
  const { pathname, ...location } = useLocation();

  return {
    ...location,
    pathname: pathname.toLowerCase(),
  };
};
