import { useEffect, useState } from 'react';

export const useLoading = (timeoutDuration: number) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, timeoutDuration);

    return () => clearTimeout(timer);
  }, [timeoutDuration]);

  return isLoading;
};
