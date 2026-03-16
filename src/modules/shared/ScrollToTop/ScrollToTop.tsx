import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 👇 Поза компонентом — виконується одразу при імпорті
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
