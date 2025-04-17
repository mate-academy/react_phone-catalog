export const useUpdateSearchParams = (
  searchParams: URLSearchParams,
  setSearchParams: (params: URLSearchParams) => void,
) => {
  const updateParam = (key: string, value: string, defaultValue: string) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('page');

    if (value === defaultValue) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    setSearchParams(newParams);
  };

  const updatePage = (page: number) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', String(page));
    setSearchParams(newParams);
  };

  return {
    updateParam,
    updatePage,
  };
};
