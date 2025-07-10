import { SeacrhParams } from '../types/SearchParams/SearchParams';

export const getSearchWith = (
  currentParams: URLSearchParams,
  paramsToUpdate: SeacrhParams,
) => {
  const newParams = new URLSearchParams(currentParams.toString());

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    newParams.set(key, value);
  });

  return newParams.toString();
};
