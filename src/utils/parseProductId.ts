import { ProductDetails } from '../types/productDetails';

export const parseProductId = (
  productId: string[],
  product: ProductDetails,
) => {
  const capacity = product.capacity.toLowerCase();
  const capacityIndex = productId.indexOf(capacity);

  const colorParts = productId.slice(capacityIndex + 1);

  return { capacityIndex, colorParts };
};
