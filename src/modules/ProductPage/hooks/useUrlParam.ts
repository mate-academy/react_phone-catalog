import { useSearchParams } from 'react-router-dom';
import { useUpdateSearchParams } from './useUpdateSearchParams';
import { useCallback } from 'react';

export function useUrlParam<T>(
  paramName: string,
  defaultValue: T,
  resetPage = false,
) {
  const [searchParams] = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  const value = (searchParams.get(paramName) || defaultValue) as T;

  const setValue = useCallback(
    (newValue: T) => {
      const updates: {
        [key: string]: string | T;
      } = {};

      updates[paramName] = newValue;

      if (resetPage) {
        updates.page = '1';
      }

      updateSearchParams(updates);
    },
    [paramName, resetPage, updateSearchParams],
  );

  return { value, setValue };
}
