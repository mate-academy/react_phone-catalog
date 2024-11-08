type Param = string | number;

export type SearchParams = {
  [key: string]: Param | Param[] | null;
};

export const getSearchWith = (
  currentParams: SearchParams,
  paramsToUpdate: string | URLSearchParams,
): string => {
  const newParams = new URLSearchParams(paramsToUpdate.toString());

  Object.entries(currentParams).forEach(([key, value]) => {
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
};
