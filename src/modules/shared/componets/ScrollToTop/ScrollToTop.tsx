import { PropsWithChildren, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ children }: PropsWithChildren) => {
  const { pathname, hash, search } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);

      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });

        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, search, hash]);

  return <>{children}</>;
};

export default ScrollToTop;
