import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export const useUpdateSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = useCallback(
    (key: string, value: string | number) => {
      const params = new URLSearchParams(searchParams);

      params.set(key, value.toString());
      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const deleteSearchParams = useCallback(
    (key: string) => {
      const newSearchParams = new URLSearchParams(searchParams);

      newSearchParams.delete(key);
      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams],
  );

  return { searchParams, updateSearchParams, deleteSearchParams };
};
