import { Params } from '../types/Params';

export function getSearchWith(
  params: Params,
  searchParams: string | URLSearchParams,
) {
  const newParams = new URLSearchParams(searchParams);

  Object.entries(params).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value.toString());
    }
  });

  return newParams.toString();
}
