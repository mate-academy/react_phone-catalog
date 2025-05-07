import { Params } from '../types/Params';

export function getNewParams(params: Params, search?: URLSearchParams) {
  const newParams = new URLSearchParams(search);

  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value.toString());
    }
  }

  return newParams.toString();
}
