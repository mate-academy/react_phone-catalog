export const setParam = (
  currentSearchParams: URLSearchParams,
  key: string,
  value: string,
) => {
  const updatedParams = new URLSearchParams(currentSearchParams);

  if (!value) {
    updatedParams.delete(key);

    return updatedParams;
  }

  updatedParams.set(key, value);

  return updatedParams;
};
