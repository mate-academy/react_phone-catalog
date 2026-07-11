import { useEffect } from 'react';

export const useLockBodyScroll = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) {
      return;
    }

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.paddingRight = originalPaddingRight;
      document.documentElement.style.overflow = originalOverflow;
    };
  }, [isLocked]);
};
