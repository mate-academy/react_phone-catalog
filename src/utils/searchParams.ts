type ParamUpdates = Record<string, string | null>;

export function updateSearchParams(
  params: URLSearchParams,
  updates: ParamUpdates,
) {
  const nextParams = new URLSearchParams(params);

  Object.entries(updates).forEach(([key, value]) => {
    if (value === null) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }
  });

  return nextParams;
}
