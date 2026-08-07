// ScrollToTop.tsx
// src/components/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // При зміні URL прокручуємо вікно в найвищу точку (0, 0)
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Цей компонент нічого не рендерить у DOM
};
