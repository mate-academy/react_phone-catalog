import { useLocation } from 'react-router-dom';

export const useActiveCategory = () => {
  const { pathname } = useLocation();

  if (pathname.includes('/phones')) {
    return 'phones';
  }

  if (pathname.includes('/tablets')) {
    return 'tablets';
  }

  if (pathname.includes('/accessories')) {
    return 'accessories';
  }

  return null;
};
