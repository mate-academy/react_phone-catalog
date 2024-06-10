type Params = {
  [key: string]: string | number | null;
};

export function getSearchWith(params: Params, searchParams?: URLSearchParams) {
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
