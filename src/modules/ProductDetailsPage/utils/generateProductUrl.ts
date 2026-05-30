export function generateProductUrl(
  category: string,
  namespaceId: string,
  capacity: string,
  color: string,
) {
  const formatedColor = color.toLowerCase().replace(/\s+/g, '-');

  return `/${category}/${namespaceId}-${capacity.toLowerCase()}-${formatedColor}`;
}
