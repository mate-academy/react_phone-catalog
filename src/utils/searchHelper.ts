type Params = {
  [key: string]: string | null;
};

export const getSearchWith = (
  params: Params,
  search?: string | URLSearchParams,
) => {
  const newParams = new URLSearchParams(search);

  Object.entries(params).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
  });

  return newParams.toString();
};
