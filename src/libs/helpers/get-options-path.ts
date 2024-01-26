export const getOptionsPath = (
  path: string,
  search: string,
  replace: string,
) => {
  return path.replace(
    search.toLowerCase(),
    replace.toLowerCase(),
  );
};
