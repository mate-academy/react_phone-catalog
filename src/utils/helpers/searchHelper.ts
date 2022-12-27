type SearchParams = {
  [key: string]: string | null,
};

export const getSearchWith = (
  currentSearchParams: URLSearchParams,
  params: SearchParams,
) => {
  const arrayOfPairs = Object.entries(params);

  arrayOfPairs.forEach(([key, value]) => {
    if (value === null) {
      currentSearchParams.delete(key);
    } else {
      currentSearchParams.set(key, value);
    }
  });

  return currentSearchParams.toString();
};
