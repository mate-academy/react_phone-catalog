import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Пытаемся скроллить само окно (на всякий случай)
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 2. Ищем элементы, которые могут быть контейнерами скролла в твоем App.tsx
    // Мы пробуем достучаться до .section или .App, которые у тебя в верстке
    const scrollableContainers = document.querySelectorAll(
      '.section, .App, html, body',
    );

    scrollableContainers.forEach(el => {
      el.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }, [pathname]);

  return null;
};
