export function getSearchWith(
  paramToUpdate: object,
  search?: string | URLSearchParams,
): string {
  const newParams = new URLSearchParams(search?.toString());

  Object.entries(paramToUpdate).forEach(([key, value]) => {
    newParams.set(key, value);
  });

  return newParams.toString();
}
