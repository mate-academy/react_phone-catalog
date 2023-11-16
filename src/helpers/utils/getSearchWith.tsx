import { SearchParams } from '../../type/SearchParams';

export function getSearchWith(
  currrentParams: URLSearchParams,
  paramsToUpdate: SearchParams,
): string {
  const newParams = new URLSearchParams(
    currrentParams.toString(),
  );

  Object.entries(paramsToUpdate)
    .forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

  if (paramsToUpdate.sort || paramsToUpdate.perPage) {
    newParams.delete('page');
  }

  return newParams.toString();
}
