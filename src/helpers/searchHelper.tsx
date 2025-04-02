export type SearchParams = {
  [key: string]: string | number | null;
};

export const getSearchWith = (
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParams,
) => {
  const newSearchParams = new URLSearchParams(currentParams);

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null) {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, value.toString());
    }
  });

  return newSearchParams.toString();
};
