import { useState, useEffect } from 'react';

const useMediaQuery = (query: { maxWidth?: number; minWidth?: number }) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    let mediaQuery = '';

    if (query.maxWidth) {
      mediaQuery = `(max-width: ${query.maxWidth}px)`;
    } else if (query.minWidth) {
      mediaQuery = `(min-width: ${query.minWidth}px)`;
    }

    const media = window.matchMedia(mediaQuery);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
};

export default useMediaQuery;
