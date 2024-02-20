type Params = {
  [key: string]: string | string[] | null;
};

export function getSearchWith(
  params: Params, searchParams: string | URLSearchParams,
) {
  const newParams = new URLSearchParams(searchParams);

  Object.entries(params)
    .forEach(([key, value]) => {
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
}
