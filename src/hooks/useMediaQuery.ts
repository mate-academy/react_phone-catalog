import { useEffect, useState } from 'react';
import { ScreenSize } from '../types/screenSize';

const useMediaQuery = (query: ScreenSize) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuryList = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuryList.addEventListener('change', handleChange);

    return () => mediaQuryList.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};

export default useMediaQuery;
