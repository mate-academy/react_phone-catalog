import { useEffect, useRef, useState } from 'react';
import { useResizeObserver } from './resizeObserver';

export function useDynamicHeader<T extends HTMLElement>(
  scrollStep = 0, widthQuery = 768,
): [React.RefObject<T>, boolean] {
  const [isTablet, setIsTablet] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const lastScrollY = useRef(window.scrollY);
  const headerRef = useResizeObserver<T>(entry => {
    const headerWidth = entry.contentRect.width;

    setIsTablet(headerWidth <= widthQuery);
  }, [widthQuery]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollChange = Math.abs(lastScrollY.current - currentScrollY);

      if (scrollChange >= scrollStep) {
        const showHeader = !(lastScrollY.current > currentScrollY || currentScrollY <= 0);

        setHideHeader(showHeader);
        lastScrollY.current = currentScrollY;
      }
    };

    if (isTablet) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isTablet, scrollStep]);

  return [headerRef, hideHeader];
}
