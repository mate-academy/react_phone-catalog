import { Params } from '../types/ParamTypes';

export const getSearchWith = (
  params: Params,
  search?: string | URLSearchParams,
) => {
  const newParams = new URLSearchParams(search);

  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(item => newParams.append(key, item.toString()));
    } else {
      newParams.set(key, value.toString());
    }
  }

  return newParams.toString();
};

export const setSearchWith = (
  params: Params,
  searchParams: URLSearchParams,
  setSearchParams: (param: string) => void,
) => {
  const search = getSearchWith(params, searchParams);

  setSearchParams(search);
};
