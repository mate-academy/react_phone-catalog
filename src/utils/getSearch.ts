export type SearchParams = {
  [key: string]: string | string[] | number | null;
};

export function getSearch(
  paramsToUpdate: SearchParams,
  currentParams?: URLSearchParams | string,
): string {
  const newSearchParams = new URLSearchParams(currentParams);

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null) {
      newSearchParams.delete(key);
    } else if (Array.isArray(value)) {
      newSearchParams.delete(key);

      value.forEach(part => {
        newSearchParams.append(key, part);
      });
    } else {
      newSearchParams.set(key, value);
    }
  });

  return newSearchParams.toString();
}
