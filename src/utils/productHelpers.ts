import type { DetailedProduct } from '../types/detailedProduct';

export const findProductVariant = (
  variants: DetailedProduct[],
  color: string | null,
  capacity: string | null,
): DetailedProduct | undefined => {
  const selectedColorLower = (color || '').toLowerCase();
  const selectedCapacityLower = (capacity || '').toLowerCase();

  return variants.find((p) => {
    const productColorLower = p.color?.toLowerCase() || '';
    const productCapacityLower = p.capacity?.toLowerCase() || '';

    const colorMatches =
      !selectedColorLower || productColorLower === selectedColorLower;

    const capacityMatches =
      ((!selectedCapacityLower ||
        selectedCapacityLower === '0gb' ||
        selectedCapacityLower === '') &&
        (productCapacityLower === '0gb' || productCapacityLower === '')) ||
      selectedCapacityLower === productCapacityLower;

    return colorMatches && capacityMatches;
  });
};
