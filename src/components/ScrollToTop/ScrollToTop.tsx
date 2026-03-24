import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Спробуємо прокрутити всі можливі елементи
    const scrollTarget = () => {
      window.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
      document.documentElement.scrollTo(0, 0);
    };

    // Виконуємо відразу
    scrollTarget();

    // І на всяк випадок через мікро-таймаут (для HashRouter це важливо)
    const timeoutId = setTimeout(scrollTarget, 0);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
