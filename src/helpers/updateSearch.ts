type SearchParams = {
  [key: string]: string | null;
};

export const updateSearch = (
  currentParams: URLSearchParams,
  params: SearchParams,
): string => {
  const newParams = new URLSearchParams(
    currentParams.toString(),
  );

  Object.entries(params).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
  });

  return newParams.toString();
};
