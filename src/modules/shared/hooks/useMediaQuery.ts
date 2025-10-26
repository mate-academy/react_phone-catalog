import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatch(media.matches);

    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, []);

  return match;
}
