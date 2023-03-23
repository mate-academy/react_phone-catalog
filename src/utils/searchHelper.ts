export const getSearch = (
  search: URLSearchParams,
  param: { [key: string]: string },
) => {
  Object.entries(param).forEach(([key, value]) => {
    if (value === '') {
      search.delete(key);
    } else {
      search.set(key, value);
    }
  });

  return search.toString();
};
