import { useEffect, useState } from 'react';

export const useVisibleCards = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (width >= 1200) {
    return 4;
  }

  if (width >= 640) {
    return 2.5;
  }

  return 1.2;
};
