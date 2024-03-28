import { SearchWithParams } from '../types/main';

export const getSearchWith = (
  params: SearchWithParams,
  search?: string | URLSearchParams,
) => {
  const newParams = new URLSearchParams(search);

  Object.entries(params).forEach(([key, value]) => {
    if (value === null) {
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

export const convertHyphenToSpace = (str: string) => {
  return str
    .split('-')
    .map((word, index) =>
      index === 0
        ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        : word,
    )
    .join(' ');
};

export const convertSpaceToHyphen = (str: string) => {
  return str
    .split(' ')
    .map(word => word.toLowerCase())
    .join('-');
};
