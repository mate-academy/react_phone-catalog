interface Params {
  [key: string]: string | null;
}

export const getSearchWith = (
  searchParams: URLSearchParams,
  params: Params,
) => {
  const newSearchParams = new URLSearchParams(searchParams);

  Object.entries(params).forEach(([key, value]) => {
    if (value === null) {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, value);
    }
  });

  return newSearchParams;
};
