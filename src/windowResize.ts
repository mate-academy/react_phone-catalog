import { useEffect, useState } from 'react';

export const useWindowResize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { width, height };
};
