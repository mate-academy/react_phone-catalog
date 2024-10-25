import { useSearchParams } from 'react-router-dom';

export const useUpdateSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams);

    params.set(key, value.toString());
    setSearchParams(params);
  };

  const deleteSearchParam = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.delete(key);
    setSearchParams(newSearchParams);
  };

  return { searchParams, updateSearchParams, deleteSearchParam };
};
