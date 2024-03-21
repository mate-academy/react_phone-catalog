import { Params } from '../type/Params';

export function getSearchWith(
  params: Params,
  search?: string | URLSearchParams,
) {
  const newParams = new URLSearchParams(search);

  Object.entries(params).forEach(param => {
    const key = param[0];
    const value = param[1];

    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value.toString());
    }
  });

  // for (const [key, value] of Object.entries(params)) {
  //   if (value === null) {
  //     newParams.delete(key);
  //   } else {
  //     newParams.set(key, value.toString());
  //   }
  // }

  return newParams.toString();
}
