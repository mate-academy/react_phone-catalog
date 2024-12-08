import { useEffect, useState } from 'react';

import { extractBreakPoints } from '../utils/helpers';

export const useMedia = () => {
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

  const [desktopBreakpoint, tabletBreakpoint] = extractBreakPoints();

  const handleResize = () => {
    const { innerWidth } = window;

    setWindowSize(innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isMobile: windowSize < tabletBreakpoint,
    isTablet: windowSize >= tabletBreakpoint && windowSize < desktopBreakpoint,
    isDesktop: windowSize >= desktopBreakpoint,
  };
};
