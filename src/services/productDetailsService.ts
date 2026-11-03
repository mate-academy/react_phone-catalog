// services/productDetails.ts
import type { ProductDetails } from '../types/ProductDetails';

export const CATEGORIES = ['phones', 'tablets', 'accessories'] as const;
export type Category = (typeof CATEGORIES)[number];

export const isCategory = (value: string | undefined): value is Category =>
  CATEGORIES.some(category => category === value);

const cache: Partial<Record<Category, Promise<ProductDetails[]>>> = {};

const getCategoryDetails = (category: Category): Promise<ProductDetails[]> => {
  if (!cache[category]) {
    cache[category] = fetch(`api/${category}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load ${category}: ${response.status}`);
        }

        return response.json() as Promise<ProductDetails[]>;
      })
      .catch(error => {
        delete cache[category];

        throw error;
      });
  }

  return cache[category];
};

export const getProductDetails = async (
  category: Category,
  productId: string,
): Promise<ProductDetails | undefined> => {
  const items = await getCategoryDetails(category);

  return items.find(item => item.id === productId);
};

export const buildVariantId = (
  namespaceId: string,
  capacity: string,
  color: string,
) => `${namespaceId}-${capacity}-${color}`.toLowerCase().replace(/\s+/g, '-');
