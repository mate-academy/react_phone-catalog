export const getNewProductPath = (
  namespaceId: string,
  capacity: string,
  color: string,
) => {
  const fixColor =
    color.split(' ').length >= 2 ? color.split(' ').join('-') : color;

  const newPath = `../${namespaceId}-${capacity}-${fixColor}`.toLowerCase();

  return newPath;
};
