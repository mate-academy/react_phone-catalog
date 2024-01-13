type Param = string | number;
export type Params = {
  [key: string]: Param | Param[] | null,
};

export function getSearchWith(
  paramsToUpdate: Params,
  currentParams: URLSearchParams,
): string {
  const newParams = new URLSearchParams(
    currentParams.toString(),
  );

  Object.entries(paramsToUpdate)
    .forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        newParams.delete(key);

        value.forEach(part => {
          newParams.append(key, part.toString());
        });
      } else {
        newParams.set(key, value.toString());
      }
    });

  return newParams.toString();
}
