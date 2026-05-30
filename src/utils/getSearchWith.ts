export type SearchParams = {
  [key: string]: string | null;
};

export function getSearchWith(
  paramsToUpdate: SearchParams,
  search?: string | URLSearchParams,
) {
  const newParams = new URLSearchParams(search);

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
  });

  return newParams.toString();
}
