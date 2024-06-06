import { useSearchParams } from 'react-router-dom';

export const useSingleSearchParam = (key: string, defaultValue = '') => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(key) ?? defaultValue;
  const setSearchParam = (newValue: string) => {
    setSearchParams(currentSearchParams => {
      currentSearchParams.set(key, newValue);

      return currentSearchParams;
    });
  };

  return [value.toLowerCase(), setSearchParam] as const;
};
