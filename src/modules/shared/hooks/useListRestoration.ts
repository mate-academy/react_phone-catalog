import { useCallback, useRef } from 'react';
import { getHeaderHeight } from '@utils/getHeaderHeight';

export const useListRestoration = (
  listRef: React.RefObject<HTMLElement | null>,
  lastItemRef: React.RefObject<HTMLElement | null>,
) => {
  const lastDiff = useRef(0);
  const lastScroll = useRef(0);
  const lastHeight = useRef<number | null>(null);

  const restoreList = useCallback(() => {
    const list = listRef.current;
    const item = lastItemRef.current;
    const prevHeight = lastHeight.current;

    if (!item || !list) {
      return;
    }

    if (prevHeight === null) {
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
      top: item.offsetTop + lastDiff.current,
    });
  }, [lastItemRef, listRef]);

  const saveDiff = useCallback(() => {
    const list = listRef.current;
    const item = lastItemRef.current;

    if (item && list) {
      const windowTop = window.scrollY;
      const elementTop = item.offsetTop;

      lastHeight.current = list.offsetHeight;
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
