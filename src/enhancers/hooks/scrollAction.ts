import { useEffect, useRef, useState } from 'react';

export function useDynamicHeader(scrollStep = 0, widthQuery = 768) {
  const [isTablet, setIsTablet] = useState(window.innerWidth < widthQuery);
  const lastScrollY = useRef(window.scrollY);
  const [hideHeader, setHideHeader] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth < widthQuery);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  return hideHeader;
}
