export const generateProductUrl = (
  category: string,
  namespaceId: string,
  capacity: string,
  color: string,
) => {
  const formattedColor = color.toLowerCase().replace(/\s+/g, '-');

  return `/${category}/${namespaceId}-${capacity.toLowerCase()}-${formattedColor}`;
};
