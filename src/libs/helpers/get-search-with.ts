import { SearchParamsType } from '../types';

export function getSearchWith(
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParamsType,
): string {
  const newParams = new URLSearchParams(
    currentParams.toString(),
  );

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
  });

  return newParams.toString();
}
