import { useLocation } from 'react-router-dom';

export const usePageName = () => {
  const { pathname } = useLocation();

  const segments = pathname.split('/').filter(Boolean);

  const pageName = segments[0]
    ? segments[0].replace(/^\w/, c => c.toUpperCase())
    : '';

  return {
    pageName,
    pathname,
  };
};
