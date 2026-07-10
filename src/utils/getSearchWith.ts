type SearchParams = {
  [key: string]: string | null;
};

export const getSearchWith = (
  paramsToUpdate: SearchParams,
  search?: string | URLSearchParams,
): string => {
  const newParams = new URLSearchParams(search);

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
  });

  return newParams.toString();
};
