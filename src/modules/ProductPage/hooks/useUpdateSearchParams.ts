import { useSearchParams } from 'react-router-dom';

type SearchParamsKeys = 'sort' | 'page' | 'perPage' | 'query';
type SearchParamsValues = string | number | null | undefined;

export function useUpdateSearchParams() {
  const [, setSearchParams] = useSearchParams();

  return (
    updatedParams: Partial<Record<SearchParamsKeys, SearchParamsValues>>,
  ) => {
    setSearchParams(prevSearchParams => {
      const params = new URLSearchParams(prevSearchParams);

      Object.entries(updatedParams).forEach(([key, value]) => {
        if (value == null) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      return params;
    });
  };
}
