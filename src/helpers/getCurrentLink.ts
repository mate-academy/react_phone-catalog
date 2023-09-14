import { ProductDetails } from '../types/ProductDetails';

export const getCurrentLink = (
  details: ProductDetails | null,
  newColor?: string,
  newCapacity?: string,
) => {
  const productName = details?.namespaceId;
  const capacity = details?.capacity;
  const color = details?.color;

  if (newColor && !newCapacity) {
    return `${productName}-${capacity}-${newColor}`.toLowerCase();
  }

  if (!newColor && newCapacity) {
    return `${productName}-${newCapacity}-${color}`.toLowerCase();
  }

  return `${productName}-${capacity}-${color}`;
};
