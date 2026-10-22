import { getPhones } from './phones';
import { getTablets } from './tablets';
import { getAccessories } from './accessories';
import { normalizeColor } from '../utils/productColors';

import type { PhoneDetails, ProductDetails, TabletDetails } from '../types';

export type DetailedProduct = PhoneDetails | ProductDetails | TabletDetails;

export type DetailedProductWithNumericId = DetailedProduct & {
  numericId: number;
};

const getAllProducts = async (): Promise<DetailedProduct[]> => {
  const [phones, tablets, accessories] = await Promise.all([
    getPhones(),
    getTablets(),
    getAccessories(),
  ]);

  return [...phones, ...tablets, ...accessories];
};

export const getProductById = async (
  productId: string,
): Promise<DetailedProductWithNumericId | undefined> => {
  try {
    const allProducts = await getAllProducts();

    const index = allProducts.findIndex(product => product.id === productId);

    if (index === -1) {
      return undefined;
    }

    return {
      ...allProducts[index],
      numericId: index + 1,
    };
  } catch {
    throw new Error('Failed to fetch product details');
  }
};

export const getSibling = async (
  product: DetailedProduct,
  changes: { color?: string; capacity?: string },
): Promise<DetailedProduct | undefined> => {
  try {
    const allProducts = await getAllProducts();

    const color = changes.color ?? product.color;
    const capacity = changes.capacity ?? product.capacity;

    return allProducts.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.capacity === capacity &&
        normalizeColor(p.color) === normalizeColor(color),
    );
  } catch {
    throw new Error('Failed to fetch product details');
  }
};
