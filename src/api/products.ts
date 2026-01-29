import { Phone } from '../types/Phone';

type ProductCategory = 'phones' | 'tablets' | 'accessories';

const getRandomItems = <T>(items: T[], count: number): T[] => {
  const limit = Math.min(count, items.length);
  const result: T[] = [];

  while (result.length < limit) {
    const index = Math.floor(Math.random() * items.length);

    result.push(items[index]);
  }

  return result;
};

export const getSuggestedProducts = async (
  category: ProductCategory,
  excludeId?: string,
  count = 10,
): Promise<Phone[]> => {
  const res = await fetch(`/api/${category}.json`);

  if (!res.ok) {
    throw new Error(
      `Failed to load suggested products for category: ${category}`,
    );
  }

  const products: Phone[] = await res.json();
  const filtered = excludeId
    ? products.filter(product => product.id !== excludeId)
    : products;

  return getRandomItems(filtered, Math.min(count, filtered.length));
};
