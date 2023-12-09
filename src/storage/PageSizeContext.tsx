import React, { useEffect, useState, createContext } from 'react';

type Context = {
  width: number,
  isMobileSize: boolean,
  isTabletSize: boolean,
  isLaptopSize: boolean,
  isDesktopSize: boolean,
};

export const PageSizeContext = createContext<Context>({
  width: 0,
  isMobileSize: false,
  isTabletSize: false,
  isLaptopSize: false,
  isDesktopSize: false,
});

type Props = {
  children: React.ReactNode;
};

export const PageSizeProvider: React.FC<Props> = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobileSize, setIsMobileSize] = useState(width < 640);
  const [isTabletSize, setIsTabletSize] = useState(
    width >= 640 && width < 900,
  );
  const [isLaptopSize, setIsLaptopSize] = useState(
    width >= 900 && width < 1200,
  );
  const [isDesktopSize, setIsDesktopSize] = useState(width >= 1200);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;

      setWidth(newWidth);
      setIsDesktopSize(newWidth >= 1200);
      setIsLaptopSize(newWidth >= 900 && newWidth < 1200);
      setIsTabletSize(
        newWidth >= 640 && newWidth < 900,
      );
      setIsMobileSize(newWidth < 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const value = {
    width,
    isMobileSize,
    isTabletSize,
    isLaptopSize,
    isDesktopSize,
  };

  return (
    <PageSizeContext.Provider value={value}>
      {children}
    </PageSizeContext.Provider>
  );
};
