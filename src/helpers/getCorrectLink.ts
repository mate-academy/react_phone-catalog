import { ProductDetails } from '../types/ProductDetails';

export const getCorrectProductLink = ({
  productDetails,
  color,
  capacity,
}: {
  productDetails: ProductDetails,
  color?: string,
  capacity?: string,
}) => {
  const productName = productDetails.namespaceId;
  const newCapacity = productDetails.capacity;
  const newColor = productDetails.color;

  if (color && !capacity) {
    return `${productName}-${newCapacity}-${color}`.toLowerCase();
  }

  if (!color && capacity) {
    return `${productName}-${capacity}-${newColor}`.toLowerCase();
  }

  return `${productName}-${newCapacity}-${newColor}`;
};
