type Param = string;
type Params = {
  [key: string]: Param | null;
};

export const getSearchWith = (
  params: Params,
  search?: string | URLSearchParams,
) => {
  const newParams = new URLSearchParams(search);

  Object.keys(params).forEach(key => {
    const value = params[key];

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
