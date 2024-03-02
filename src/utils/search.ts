export type Param = string | number;

type Params = {
  [key: string]: Param | Param[] | null
};

export function getSearchWith(
  params: Params,
  search?: URLSearchParams | string,
) {
  const newParams = new URLSearchParams(search);

  Object.entries(params)
    .forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        newParams.delete(key);
        value.forEach(item => newParams.append(key, item.toString()));
      } else {
        newParams.set(key, value.toString());
      }
    });

  return newParams;
}
