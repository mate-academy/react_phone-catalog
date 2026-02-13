import { useLocation } from 'react-router-dom';

export const usePathSegments = () => {
  const location = useLocation();

  return location.pathname.split('/').filter(Boolean);
};
