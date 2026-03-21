export const getProductDetailsPath = (
  namespaceId: string,
  capacity: string,
  color: string,
) => {
  const formattedColor = color.toLowerCase().replace(/\s+/g, '-');

  return `/product/${namespaceId}-${capacity.toLowerCase()}-${formattedColor}`;
};
