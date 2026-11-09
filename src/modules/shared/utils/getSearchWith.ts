type SearchChanges = Record<string, string | null>;

export function getSearchWith(
  currentParams: URLSearchParams,
  changes: SearchChanges,
): URLSearchParams {
  const newParams = new URLSearchParams(currentParams);

  Object.entries(changes).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
  });

  return newParams;
}
