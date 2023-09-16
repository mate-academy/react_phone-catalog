// export enum SearchKey {
//   QUERY = 'query',
//   SEX = 'sex',
//   CENTURIES = 'centuries',
//   SORT = 'sort',
//   ORDER = 'order',
// }

// export enum SexType {
//   MALE = 'm',
//   FEMALE = 'f',
// }

export type SearchParams = {
  [key: string]: string | string[] | null,
};

export function getSearchWith(
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParams,
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
          newParams.append(key, part);
        });
      } else {
        newParams.set(key, value);
      }
    });

  return newParams.toString();
}
