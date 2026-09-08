import { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';

/**
 * ScrollToTop
 * Цей компонент гарантує, що вікно прокручується до верху (0, 0)
 * щоразу, коли змінюється маршрут (URL) або його параметри (search).
 */
export const ScrollToTop = () => {
  // Отримуємо весь об'єкт location, який включає pathname та search
  const { pathname, search } = useLocation();
  const { category = '' } = useParams<{ category: string }>();
  const prevPathname = useRef(pathname);
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    // Прокручуємо до верху з плавною анімацією
    // лише якщо змінився сам маршрут (а не query-параметри)
    if (prevPathname.current !== pathname) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: isMobile ? 'auto' : 'smooth',
      });
      prevPathname.current = pathname;
    }
  }, [pathname, search, isMobile, category]);

  // Компонент нічого не відображає
  return null;
};
