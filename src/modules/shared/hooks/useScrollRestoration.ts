import { useLocation } from 'react-router-dom';
import { useCallback, useEffect, useRef } from 'react';

import { getHistoryStateItem } from '@utils/getHistoryStateItem';
import { setHistoryStateItem } from '@utils/setHistoryStateItem';

import { useDebounce } from './useDebounce';

const NAME = 'top';

export const useScrollRestoration = () => {
  const firstLoad = useRef(true);
  const { pathname } = useLocation();

  const savePosCallback = useCallback((name: string, pos: number) => {
    setHistoryStateItem(name, pos);
  }, []);

  const [savePos, cancelPosSaving] = useDebounce(savePosCallback, 100);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      const prevTop = getHistoryStateItem<number>(NAME) || 0;

      window.scrollTo({ top: prevTop, behavior: 'smooth' });
    }
  }, [pathname]);

  useEffect(() => {
    const scrollHandler = () => {
      savePos(NAME, window.scrollY);
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      cancelPosSaving();
    };
  }, [cancelPosSaving, savePos]);
};
