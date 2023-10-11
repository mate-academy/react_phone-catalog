export type SearchParam = {
  [key: string]: string | string[] | null,
};

export const getSearchWith = (
  currentParam: URLSearchParams,
  paramToUpdate: SearchParam,
) => {
  const newParam = new URLSearchParams(
    currentParam.toString(),
  );

  Object.entries(paramToUpdate)
    .forEach(([key, value]) => {
      if (value === null) {
        newParam.delete(key);
      } else if (Array.isArray(value)) {
        newParam.delete(key);

        value.forEach(part => {
          newParam.append(key, part);
        });
      } else {
        newParam.set(key, value);
      }
    });

  return newParam.toString();
};
