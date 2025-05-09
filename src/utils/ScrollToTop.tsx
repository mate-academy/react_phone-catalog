'use client';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Прокрутка на верхню частину сторінки при зміні шляху
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
