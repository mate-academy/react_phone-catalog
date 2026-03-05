import { useState, useEffect } from 'react';
import {
  BASE_FINE,
  FINE_INCREMENT_PER_SECOND,
  FINE_INTERVAL_MS,
} from '../constants/notFoundPage';

export function useAccruingFine() {
  const [fine, setFine] = useState(BASE_FINE);

  useEffect(() => {
    const timer = setInterval(() => {
      setFine((previous) => previous + FINE_INCREMENT_PER_SECOND);
    }, FINE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return fine;
}
