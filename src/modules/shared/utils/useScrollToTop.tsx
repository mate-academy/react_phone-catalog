import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const pathParts = pathname.split('/');
    const productId = pathParts[2];

    if (!productId) {
      window.scrollTo(0, 0);

      return;
    }
  }, [pathname]);
}
