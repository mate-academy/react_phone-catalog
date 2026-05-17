export function getSearchWith(
  current: URLSearchParams,
  updates: Record<string, string | null>,
) {
  const params = new URLSearchParams(current.toString());

  Object.entries(updates).forEach(([key, value]) => {
    if (value === null || value === '') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
  });

  return params.toString();
}
