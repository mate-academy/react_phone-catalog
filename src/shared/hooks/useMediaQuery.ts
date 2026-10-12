import { useEffect, useState } from 'react';

import { BREAKPOINTS } from '@/shared/constants';

const getBreakpoint = () => ({
  isMobile: window.innerWidth < BREAKPOINTS.tablet,
  isTablet:
    window.innerWidth >= BREAKPOINTS.tablet &&
    window.innerWidth < BREAKPOINTS.desktop,
  isDesktop: window.innerWidth >= BREAKPOINTS.desktop,
});

export const useMediaQuery = () => {
  const [breakpoint, setBreakpoint] = useState(getBreakpoint);

  useEffect(() => {
    const handler = () => setBreakpoint(getBreakpoint());

    window.addEventListener('resize', handler);

    return () => window.removeEventListener('resize', handler);
  }, []);

  return breakpoint;
};
