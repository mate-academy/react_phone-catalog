import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

type ParamValue = string | null;

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(
    () => Object.fromEntries(searchParams) as Record<string, string>,
    [searchParams],
  );

  // Update a single param
  const setParam = useCallback(
    (key: string, value: ParamValue) => {
      const next = new URLSearchParams(searchParams);

      if (value == null || value === '') {
        next.delete(key);
      } else {
        next.set(key, value);
      }

      if (next.toString() !== searchParams.toString()) {
        setSearchParams(next);
      }
    },
    [searchParams, setSearchParams],
  );

  // Update multiple params at once
  const setParams = useCallback(
    (updates: Record<string, ParamValue>) => {
      const next = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value == null || value === '') {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      });

      if (next.toString() !== searchParams.toString()) {
        setSearchParams(next);
      }
    },
    [searchParams, setSearchParams],
  );

  return {
    params,
    setParam,
    setParams,
  };
};
