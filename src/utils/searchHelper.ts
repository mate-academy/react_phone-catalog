export type SearchParams = {
  [key: string]: string | string[] | null;
};

export const getSearchWith = (
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParams,
): string => {
  const param = new URLSearchParams(currentParams);

  Object.entries(paramsToUpdate).forEach(([key, values]) => {
    if (values === null) {
      param.delete(key);
    } else if (Array.isArray(values)) {
      values.forEach(part => param.append(key, part));
    } else {
      param.set(key, values);
    }
  });

  return param.toString();
};
