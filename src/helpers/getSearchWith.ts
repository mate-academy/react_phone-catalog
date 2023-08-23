import { Params } from '../types/Params';

export const getSearchWith = (
  params: Params,
  search?: string | URLSearchParams,
) => {
  const newParams = new URLSearchParams(search);

  Object.entries(params).forEach(i => {
    const [key, value] = i;

    if (!value) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(item => newParams.append(key, item.toString()));
    } else {
      newParams.set(key, value.toString());
    }
  });

  return newParams.toString();
};
