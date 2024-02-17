import { Params } from '../types/searchParams';

export function getSearchParamsWith(
  params: Params,
  searchParams: URLSearchParams | string,
) {
  const newParams = new URLSearchParams(searchParams);

  const entries = Object.entries(params);

  entries.forEach(entry => {
    const [key, value] = entry;

    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(el => newParams.append(key, el.toString()));
    } else {
      newParams.set(key, value.toString());
    }
  });

  return newParams.toString();
}
