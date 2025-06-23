import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export const useSaveFilterInParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const saveFilterInParams = useCallback(
    (key: string, value: string | number) => {
      const newSearchParams = new URLSearchParams(searchParams);

      newSearchParams.set(key, String(value));

      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams],
  );

  return { saveFilterInParams };
};
