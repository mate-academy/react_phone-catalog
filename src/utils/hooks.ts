import { useSearchParams } from 'react-router-dom';

export const useUpdateSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearch = (params: {
    [key: string]: number[] | string[] | string | null
  }) => {
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        searchParams.delete(key);
      } else if (Array.isArray(value)) {
        searchParams.delete(key);

        value.forEach(part => {
          searchParams.append(key, String(part));
        });
      } else {
        searchParams.set(key, value);
      }

      setSearchParams(searchParams);
    });
  };

  return { updateSearch, searchParams };
};
