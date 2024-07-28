export type SearchParams = {
  [key: string]: string | string[] | null;
};

export function getSearchWith(
  paramsToUpdate: SearchParams,
  search: string | URLSearchParams = '',
): string {
  const newParams = new URLSearchParams(search);

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(part => {
        newParams.append(key, part);
      });
    } else {
      newParams.set(key, value);
    }
  });

  return newParams.toString();
}
