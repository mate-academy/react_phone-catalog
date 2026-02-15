import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import { useHistory } from './useHistory';

const NAME = 'top';

export const useScrollRestoration = () => {
  const firstLoad = useRef(true);
  const { pathname } = useLocation();
  const { getHistoryItem, setHistoryItem } = useHistory();

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      const prevTop = getHistoryItem<number>(NAME) || 0;

      window.scrollTo({ top: prevTop, behavior: 'instant' });
    }
  }, [getHistoryItem, pathname]);

  useEffect(() => {
    const scrollHandler = () => {
      setHistoryItem(NAME, window.scrollY);
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [setHistoryItem]);
};
