import React, {
  createContext,
  useEffect,
  useState,
} from 'react';

export enum ScreenType {
  isMobile = 'isMobile',
  isTablet = 'isTablet',
  isDesktop = 'isDesktop',
}

export const ScreenSizeContext = createContext<ScreenType>(ScreenType.isMobile);

interface Props {
  children: React.ReactNode;
}

function getScreenSize(size: number) {
  if (size >= 1200) {
    return ScreenType.isDesktop;
  }

  if (size >= 640) {
    return ScreenType.isTablet;
  }

  return ScreenType.isMobile;
}

export const ScreenSizeProvider: React.FC<Props> = ({ children }) => {
  const [screenSize, setScreenSize] = useState<ScreenType>(() => {
    return getScreenSize(document.documentElement.clientWidth);
  });

  useEffect(() => {
    const handleResize = () => {
      const width = document.documentElement.clientWidth;
      const size = getScreenSize(width);

      setScreenSize(size);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window]);

  return (
    <ScreenSizeContext.Provider value={screenSize}>
      {children}
    </ScreenSizeContext.Provider>
  );
};
