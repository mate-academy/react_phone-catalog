import { useState } from 'react';

type CallbackType = () => Promise<void>;
type FetchingReturnType = [() => Promise<void>, boolean, string];

export const useFetching = (callback: CallbackType): FetchingReturnType => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  const fetching = async () => {
    try {
      setIsLoading(true);
      await callback();
    } catch (e) {
      if (e instanceof Error) {
        setIsError(e.message);
      } else {
        setIsError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, isError];
};
