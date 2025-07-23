import { useSearchParams } from 'react-router-dom';

export const useQueryParams = (defaultCategory: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const perPage = searchParams.get('perPage') ?? '8';
  const page = searchParams.get('page') ?? '1';
  const category = searchParams.get('category') ?? defaultCategory;
  const search = searchParams.get('search') ?? '';

  const refreshParams = (updates: Record<string, string | number | null>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });

    if ([...newParams.keys()].length === 0) {
      setSearchParams({});
    } else {
      setSearchParams(newParams);
    }
  };

  return {
    category,
    perPage,
    page,
    refreshParams,
    sort,
    search,
  };
};
