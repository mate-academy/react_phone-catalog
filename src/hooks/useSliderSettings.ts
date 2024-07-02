import { useEffect, useState } from 'react';

const useSliderSettings = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let itemWidth = 212;
  let frameSize = 2;
  const gap = 16;
  let step = 2;

  if (screenWidth >= 640 && screenWidth < 1200) {
    itemWidth = 237;
    frameSize = 3;
    step = 3;
  } else if (screenWidth >= 1200) {
    itemWidth = 272;
    frameSize = 4;
    step = 4;
  }

  return {
    itemWidth,
    frameSize,
    gap,
    step,
  };
};

export default useSliderSettings;
