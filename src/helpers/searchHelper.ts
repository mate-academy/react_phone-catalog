export type SearchParams = {
  [key: string]: string | string[] | null;
};

export function getSearchWith(params: SearchParams, search: URLSearchParams) {
  const newParams = new URLSearchParams(search);

  Object.entries(params).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(item => newParams.append(key, item));
    } else {
      newParams.set(key, value);
    }
  });

  return newParams.toString();
}
