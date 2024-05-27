import { Product } from '../types/Product';

export function getSimilarDevices(
  product: Product,
  namespaceId: string,
  indexSimilarDevices: number[],
  i: number,
) {
  const name = product.itemId.split('-').slice(0, -2).join('-');

  if (name === namespaceId) {
    indexSimilarDevices.push(i);

    return true;
  }

  return false;
}
