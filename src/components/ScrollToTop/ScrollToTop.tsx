import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    if (prevPath.split('/').length !== pathname.split('/').length) {
      window.scrollTo(0, 0);
    }

    setPrevPath(pathname);
  }, [pathname, prevPath]);

  return null;
};
