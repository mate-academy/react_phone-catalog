import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

type SearchParams = {
  [key: string]: string | string[] | null;
};

export const useUpdateSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = useCallback(
    (paramsToUpdate: SearchParams) =>
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);

        Object.entries(paramsToUpdate).forEach(([key, value]) => {
          if (value === null) {
            newParams.delete(key);
          } else if (Array.isArray(value)) {
            newParams.delete(key);
            value.forEach(part => {
              newParams.append(key, part);
            });
          } else {
            newParams.set(key, value);
          }
        });

        return newParams;
      }),
    [setSearchParams],
  );

  return { updateSearchParams, searchParams };
};
