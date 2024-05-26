import { Product } from '../types/Product';

export function getSimilarDevices(
  product: Product,
  namespaceId: string,
  indexSimilarDevices: number[],
  i: number,
) {
  if (product.itemId.includes('pro') && !namespaceId.includes('pro')) {
    return false;
  }

  const slicedItemIdProduct =
    product.itemId
      .split('-')
      .slice(0, namespaceId.split('-').length)
      .join('-') === namespaceId;

  if (slicedItemIdProduct) {
    indexSimilarDevices.push(i);

    return true;
  }

  return false;
}

// data.forEach((product, i) => {
//   if (product.itemId.includes('pro') && !namespaceId.includes('pro')) {
//     return false;
//   }

//   const slicedItemIdProduct =
//     product.itemId
//       .split('-')
//       .slice(0, namespaceId.split('-').length)
//       .join('-') === namespaceId;

//   if (slicedItemIdProduct) {
//     indexSimilarDevices.push(i);

//     return true;
//   }

//   return false;
// });
