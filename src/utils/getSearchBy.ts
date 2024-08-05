export type SearchParams = { [key: string]: string | null };

export const getSearchBy = (
  currParams: URLSearchParams,
  newParams: SearchParams,
): string => {
  const updatedParams = new URLSearchParams(currParams.toString());

  Object.entries(newParams).forEach(([key, value]) => {
    if (value === null) {
      updatedParams.delete(key);
    } else {
      updatedParams.set(key, value);
    }
  });

  return updatedParams.toString();
};
