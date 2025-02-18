import { Product } from '../types/Product';

export function getUniqueItems(products: Product[]) {
  const uniqueNameSpaceId = new Set();
  const uniqueColor = new Set();

  return products
    .filter(phone => {
      if (
        !uniqueNameSpaceId.has(phone.namespaceId) &&
        !uniqueColor.has(phone.color)
      ) {
        uniqueNameSpaceId.add(phone.namespaceId);
        uniqueColor.add(phone.color);

        return true;
      }

      return false;
    })
    .toSorted((a, b) => b.priceRegular - a.priceRegular);
}
