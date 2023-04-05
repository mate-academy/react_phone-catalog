export function updateSeachParams(setSearchParams: URLSearchParams, params: { [key: string]: string | string[] | null }) {
  const newParams = new URLSearchParams(
    setSearchParams.toString(),
  );

  Object.entries(params).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach((part) => {
        newParams.append(key, part);
      });
    } else {
      newParams.set(key, value);
    }
  });

  return newParams.toString();
}
