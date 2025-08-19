import { useMediaQuery } from './useMediaQuery';
import { BREAKPOINTS } from '../constants/Breakpoints';

export const useBreakpoints = () => {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  const isTablet = useMediaQuery(BREAKPOINTS.tablet);
  const isDesktop = useMediaQuery(BREAKPOINTS.desktop);
  const isDesktopUp = useMediaQuery(BREAKPOINTS.desktopUp);
  const isTabletUp = useMediaQuery(BREAKPOINTS.tabletUp);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isDesktopUp,
    isTabletUp,
    isMobileOrTablet: isMobile || isTablet,
    isTabletOrDesktop: isTablet || isDesktop,
  } as const;
};
