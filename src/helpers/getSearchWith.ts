import { SearchParams } from '../types/SearchParams';

export function getSearchWith(
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParams,
) {
  const newSearchParams = new URLSearchParams(currentParams.toString());

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null) {
      newSearchParams.delete('key');
    } else if (Array.isArray(value)) {
      newSearchParams.delete(key);

      value.forEach(part => newSearchParams.append(key, part));
    } else {
      newSearchParams.set(key, value);
    }
  });

  return newSearchParams.toString();
}
