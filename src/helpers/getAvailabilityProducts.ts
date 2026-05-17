/* eslint-disable @typescript-eslint/indent */
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

type VariantEntry = {
  product: Product | { itemId: string; color: string; capacity: string }; //fallback if not found
  available: boolean;
};

type VariantOptions = {
  colorOptions: { color: string; available: boolean }[];
  capacityOptions: { capacity: string; available: boolean }[];
};
export const normalize = (str: string) =>
  str.toLowerCase().replace(/\s+/g, '-');

export const getVariantOptions = (
  details: ProductDetails,
  products: Product[],
): VariantOptions => {
  const colors = Array.isArray(details.colorsAvailable)
    ? details.colorsAvailable
    : [];
  const capacities = Array.isArray(details.capacityAvailable)
    ? details.capacityAvailable
    : [];

  const productMap = new Map(products.map(p => [p.itemId, p]));
  const variantEntries: VariantEntry[] = [];

  for (const color of colors) {
    for (const capacity of capacities) {
      const itemId = `${details.namespaceId}-${normalize(capacity)}-${normalize(color)}`;
      const existingProduct = productMap.get(itemId);

      variantEntries.push({
        product: existingProduct
          ? {
              ...existingProduct,
              color: normalize(existingProduct.color),
              capacity: normalize(existingProduct.capacity),
            }
          : {
              itemId,
              color: normalize(color),
              capacity: normalize(capacity),
            },
        available: !!existingProduct,
      });
    }
  }

  const colorOptions = colors.map(color => {
    const available = variantEntries.some(
      v =>
        v.product.color === normalize(color) &&
        v.product.capacity === normalize(details.capacity) &&
        v.available,
    );

    return { color, available };
  });

  const capacityOptions = capacities.map(capacity => {
    const available = variantEntries.some(
      v =>
        v.product.capacity === normalize(capacity) &&
        v.product.color === normalize(details.color) &&
        v.available,
    );

    return { capacity, available };
  });

  return { colorOptions, capacityOptions };
};
