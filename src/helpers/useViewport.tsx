import { useState, useEffect } from 'react';

export const useViewport = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobileSize, setIsMobileSize] = useState(width < 576);
  const [isTabletSize, setIsTabletSize] = useState(width < 767);
  const [isTabletLaptopSize, setIsTabletLaptopSize] = useState(width < 992);
  const [isLaptopSize, setIsLaptopSize] = useState(width < 1024);
  const [isDesktopSize, setIsDesktopSize] = useState(width > 1200);

  useEffect(() => {
    const handleWindow = () => {
      setWidth(window.innerWidth);
      setIsMobileSize(window.innerWidth < 576);
      setIsTabletSize(window.innerWidth < 767);
      setIsTabletLaptopSize(window.innerWidth < 992);
      setIsLaptopSize(window.innerWidth < 1024);
      setIsDesktopSize(window.innerWidth > 1200);
    };

    window.addEventListener('resize', handleWindow);

    return () => {
      window.removeEventListener('resize', handleWindow);
    };
  }, []);

  return {
    width,
    isTabletSize,
    isMobileSize,
    isTabletLaptopSize,
    isLaptopSize,
    isDesktopSize,
  };
};
