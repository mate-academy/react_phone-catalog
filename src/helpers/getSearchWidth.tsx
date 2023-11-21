type Param = string | number;
type Params = {
  [key: string]: Param[] | Param | null;
};

export function getSearchWith(
  params: Params,
  search?: string | URLSearchParams,
) {
  const newParams = new URLSearchParams(search);

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(item => newParams.append(key, item.toString()));
    } else {
      newParams.set(key, value.toString());
    }
  }

  return newParams.toString();
}
