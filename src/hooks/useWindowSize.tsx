import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export const useWindowSize = () => {
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    const resizeHandler = debounce(() => {
      setSize(window.innerWidth);
    }, 300);

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      resizeHandler.cancel();
    };
  }, []);

  return size;
};
