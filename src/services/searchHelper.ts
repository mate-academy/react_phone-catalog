export type SearchParams = {
  [key: string]: string;
};

export function getSearchWith(
  paramsToUpdate: SearchParams,
  defaultValue: string,
  search?: string | URLSearchParams,
): string {
  const newParams = new URLSearchParams(search);

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === defaultValue) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
  });

  return newParams.toString();
}
