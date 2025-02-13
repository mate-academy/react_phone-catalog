import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getHistoryStateItem } from '@utils/getHistoryStateItem';
import { setHistoryStateItem } from '@utils/setHistoryStateItem';

export const useScrollRestoration = () => {
  const firstLoad = useRef(true);
  const { pathname } = useLocation();

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      const prevTop = getHistoryStateItem<number>('top') || 0;

      window.scrollTo({ top: prevTop, behavior: 'smooth' });
    }
  }, [pathname]);

  useEffect(() => {
    const scrollHandler = () => {
      setHistoryStateItem('top', window.scrollY);
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);
};
