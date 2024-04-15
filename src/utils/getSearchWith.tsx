type Param = string | number;

export type Params = {
  [key: string]: Param | null | Param[];
};

export const getSearchWith = (
  currentParams: URLSearchParams,
  paramsToUpdate: Params,
) => {
  const newParams = new URLSearchParams(currentParams.toString());

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
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
