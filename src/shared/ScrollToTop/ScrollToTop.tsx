import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
};

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a');

      if (!anchor || anchor.target === '_blank') {
        return;
      }

      const href = anchor.getAttribute('href');

      if (!href || href.startsWith('#')) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);

      if (url.origin === window.location.origin) {
        scrollToTop();
      }
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
};
