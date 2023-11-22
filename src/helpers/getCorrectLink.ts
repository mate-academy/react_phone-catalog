import { ProductDetails } from '../types/ProductDetails';

export const getCorrectProductLink = (
  details: ProductDetails | null,
  newCapacity?: string,
  newColor?: string,
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
