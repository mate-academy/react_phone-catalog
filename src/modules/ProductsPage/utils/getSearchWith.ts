type SearchParamsValue = string | number | null | string[];

type SearchParams = {
  page: number;
  [key: string]: SearchParamsValue;
};

export function getSearchWith(
  paramsToUpdate: SearchParams,
  search?: string | URLSearchParams,
): string {
  const newParams = new URLSearchParams(search);

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null || value === '') {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(part => {
        newParams.append(key, part);
      });
    } else {
      newParams.set(key, String(value));
    }
  });

  return newParams.toString();
}
