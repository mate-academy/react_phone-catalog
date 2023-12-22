export const getSearchString = (
  searchParams: URLSearchParams,
  params:{ [key: string]: string | null },
) => {
  const urlSearchParams = new URLSearchParams(searchParams);

  Object.entries(params)
    .forEach(([key, value]) => {
      if (value) {
        urlSearchParams.set(key, value);
      } else {
        urlSearchParams.delete(key);
      }
    });

  return urlSearchParams.toString();
};
