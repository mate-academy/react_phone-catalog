import { useEffect, useState } from 'react';

type Window = {
  width: number,
  height: number
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Window>({
    width: 1040,
    height: 400,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};
