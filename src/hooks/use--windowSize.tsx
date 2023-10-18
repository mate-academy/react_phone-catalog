import { useState, useEffect } from 'react';

function getWindowSize() {
  const { innerWidth, innerHeight } = window;

  return { innerWidth, innerHeight };
}

export const useWindowSizes = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return [windowSize.innerWidth, windowSize.innerHeight];
};
