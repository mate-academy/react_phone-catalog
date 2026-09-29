export type SearchParamsChanges = {
  [key: string]: string | string[] | null;
};

export function getSearchWith(
  paramsToUpdate: SearchParamsChanges,
  currentParams?: URLSearchParams | string,
): string {
  const newParams = new URLSearchParams(currentParams?.toString());

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    // If the value is null or an empty array, remove the parameter from the URL
    if (value === null || (Array.isArray(value) && value.length === 0)) {
      newParams.delete(key);

      return;
    }

    if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(item => newParams.append(key, item));

      return;
    }

    newParams.set(key, value);
  });

  return newParams.toString();
}
