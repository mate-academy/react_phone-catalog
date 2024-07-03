export function changeIdsParams(
  replaceItem: string,
  onNewItem: string,
  productId = '',
) {
  const newProductIds = productId
    ?.split('-')
    .join(' ')
    .replace(replaceItem.toLowerCase(), onNewItem.toLowerCase())
    .split(' ')
    .join('-');

  return newProductIds;
}
