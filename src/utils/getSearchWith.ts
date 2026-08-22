type Params = Record<string, string | number | null | undefined>;

export function getSearchWith(
  currentParams: URLSearchParams,
  paramsToUpdate: Params,
): URLSearchParams {
  const newParams = new URLSearchParams(currentParams);

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      newParams.delete(key);
    } else {
      newParams.set(key, String(value));
    }
  });

  return newParams;
}
