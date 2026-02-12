import { useEffect, useState } from 'react';

export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    const handler = () => setIsMobile(media.matches);

    media.addEventListener('change', handler);

    return () => media.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
};
