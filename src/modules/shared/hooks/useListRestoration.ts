import { useCallback, useRef } from 'react';
import { getHeaderHeight } from '@utils/getHeaderHeight';

export const useListRestoration = (
  listRef: React.RefObject<HTMLElement | null>,
  lastItemRef: React.RefObject<HTMLElement | null>,
) => {
  const lastScroll = useRef(0);
  const lastDiff = useRef<number | null>(null);

  const restoreList = useCallback(() => {
    const list = listRef.current;
    const item = lastItemRef.current;
    const prevDiff = lastDiff.current;

    if (!item || !list) {
      return;
    }

    if (prevDiff === null) {
      const prevScroll = lastScroll.current;

      if (
        list.offsetHeight === item.offsetHeight &&
        prevScroll !== window.scrollY
      ) {
        const headerHeight = getHeaderHeight();
        const listTop = list.offsetTop - headerHeight;

        window.scrollTo({
          behavior: 'instant',
          top: listTop,
        });
      } else {
        window.scrollTo({
          behavior: 'instant',
          top: prevScroll,
        });
      }

      return;
    }

    window.scrollTo({
      behavior: 'instant',
      top: item.offsetTop + prevDiff,
    });

    lastDiff.current = null;
  }, [lastItemRef, listRef]);

  const saveDiff = useCallback(() => {
    const list = listRef.current;
    const item = lastItemRef.current;

    if (item && list) {
      const windowTop = window.scrollY;
      const elementTop = item.offsetTop;

      lastDiff.current = windowTop - elementTop;
    }
  }, [lastItemRef, listRef]);

  const saveLastScroll = useCallback(() => {
    lastScroll.current = window.scrollY;
  }, []);

  return {
    saveDiff,
    restoreList,
    saveLastScroll,
  };
};
