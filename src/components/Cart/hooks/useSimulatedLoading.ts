import { useState, useEffect } from 'react';
import { LOADING_DELAY_MS } from '../constants/loadingDelay';

export const useSimulatedLoading = (
  delayMs: number = LOADING_DELAY_MS,
): boolean => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), delayMs);

    return () => clearTimeout(timeout);
  }, [delayMs]);

  return isLoading;
};
