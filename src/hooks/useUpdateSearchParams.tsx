import { useSearchParams } from 'react-router-dom';

export const useUpdateSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams);

    params.set(key, value.toString());
    setSearchParams(params);
  };

  return { searchParams, updateSearchParams };
};
