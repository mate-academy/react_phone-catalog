import { useEffect, useState } from 'react';

export const useLoader = (delay: number = 1000) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return loading;
};
