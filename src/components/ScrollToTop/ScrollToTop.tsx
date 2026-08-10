import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname, state } = useLocation();
  const shouldPreserveScroll = state?.preserveScroll === true;
  const scrollBehavior = state?.scrollBehavior === 'smooth' ? 'smooth' : 'auto';

  useLayoutEffect(() => {
    if (shouldPreserveScroll) {
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: scrollBehavior,
    });
  }, [pathname, scrollBehavior, shouldPreserveScroll]);

  return null;
};
