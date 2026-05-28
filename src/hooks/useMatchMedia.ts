import { useState, useEffect } from 'react';

export function useMatchMedia(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media: MediaQueryList = window.matchMedia(query);

    setMatches(media.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener('change', handleChange);

    return () => {
      media.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}
