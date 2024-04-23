import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useLoading = (initialState = true, delay = 300) => {
  const [isLoading, setIsLoading] = useState(initialState);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, location]);

  return isLoading;
};
