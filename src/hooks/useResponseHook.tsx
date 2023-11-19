import { useEffect, useState } from 'react';

export const useResponseHook = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
  }, [window.innerWidth]);

  return width;
};
