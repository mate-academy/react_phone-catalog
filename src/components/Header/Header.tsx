import React, { useEffect, useState } from 'react';
import { HeaderDesktop } from './HeaderDesktop/HeaderDesktop';
import { HeaderMobile } from './HeaderMobile/HeaderMobile';

export function Header() {
  const breakpoint = 640;
  const getInitial = () => {
    if (typeof window === 'undefined') return false;

    return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
  };

  const [isMobile, setIsMobile] = useState(getInitial);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = e => setIsMobile(e.matches);

    // đảm bảo initial актуальний
    setIsMobile(mql.matches);

    if (mql.addEventListener) mql.addEventListener('change', handler);
    else mql.addListener(handler);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', handler);
      else mql.removeListener(handler);
    };
  }, [breakpoint]);

  return isMobile ? <HeaderMobile /> : <HeaderDesktop />;
}
