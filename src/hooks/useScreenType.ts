import { useEffect, useState } from 'react';
import { TABLET_WIDTH, DESKTOP_WIDTH } from '../utils/constants';

export type ScreenType = 'mobile' | 'tablet' | 'desktop';

const getScreenType = (): ScreenType => {
  if (window.innerWidth >= DESKTOP_WIDTH) {
    return 'desktop';
  }

  if (window.innerWidth >= TABLET_WIDTH) {
    return 'tablet';
  }

  return 'mobile';
};

export const useScreenType = () => {
  const [screenType, setScreenType] = useState<ScreenType>(() => {
    return getScreenType();
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenType(getScreenType());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenType;
};
