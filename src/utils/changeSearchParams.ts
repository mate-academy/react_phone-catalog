type NewSearchParams = {
  [key: string]: string | string[] | null;
};

export function changeSearchParams(
  currentParams: URLSearchParams,
  newParams: NewSearchParams,
) {
  const newSeachParams = new URLSearchParams(currentParams);

  for (const [key, value] of Object.entries(newParams)) {
    if (value === null) {
      newSeachParams.delete(key);
    } else if (Array.isArray(value)) {
      newSeachParams.delete(key);

      value.forEach(v => {
        newSeachParams.append(key, v);
      });
    } else {
      newSeachParams.set(key, value);
    }
  }

  return newSeachParams.toString();
}
