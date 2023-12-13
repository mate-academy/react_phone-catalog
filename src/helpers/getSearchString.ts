export const getSearchString = (
  searchParams: URLSearchParams,
  key: string,
  value: string,
) => {
  const urlSearchParams = new URLSearchParams(searchParams);

  urlSearchParams.set(key, value);

  return urlSearchParams.toString();
};
