import { useEffect, useState } from 'react';
import { Error } from '../types/others/types';

export const useErrorTimer = () => {
  const [error, setError] = useState<Error>({
    id: 0,
    isError: false,
    type: 'success',
    text: '',
  });

  const createErrorTimer = () => {
    let timerId: NodeJS.Timeout;

    return (clear?: boolean) => {
      clearTimeout(timerId);

      if (clear) {
        return;
      }

      timerId = setTimeout(() => {
        setError((prev) => ({ ...prev, isError: false }));
      }, 5000);
    };
  };

  const restartErrorInterval = createErrorTimer();

  const setErrorTimer = (errorToSet: React.SetStateAction<Error>) => {
    setError(errorToSet);
  };

  useEffect(() => {
    if (error.isError) {
      restartErrorInterval();
    }

    return () => restartErrorInterval(true);
  }, [error.id]);

  return { error, setErrorTimer };
};
