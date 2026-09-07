import { BannerSliderMobile } from '../BannerSliderMobile';
import { BannerSliderTablet } from '../BannerSliderTablet';
import { useEffect, useState } from 'react';

export const BannerSlider = () => {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (windowWidth === null) {
    return;
  }

  if (windowWidth < 640) {
    return <BannerSliderMobile />;
  }

  return <BannerSliderTablet />;
};
