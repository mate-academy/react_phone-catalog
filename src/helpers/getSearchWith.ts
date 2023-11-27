export function getSearchWith(
  currentParams: URLSearchParams,
  paramsToUpdate: { [key: string]: string | null },
): string {
  Object.entries(paramsToUpdate)
    .forEach(([key, val]) => {
      if (val === null) {
        currentParams.delete(key);
      } else {
        currentParams.set(key, val);
      }
    });

  return currentParams.toString();
}
