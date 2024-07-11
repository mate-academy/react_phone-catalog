export const getSearch = (
  currentSearch: URLSearchParams,
  newParams: { [key: string]: string },
) => {
  const params = new URLSearchParams(currentSearch);

  Object.entries(newParams).forEach(([key, value]) => {
    if (value === null) {
      params.delete(key);
    } else if (Array.isArray(value)) {
      params.delete(key);

      for (let i = 0; i < value.length; i++) {
        params.append(key, value[i]);
      }
    } else {
      params.set(key, value);
    }
  });

  return params.toString();
};
