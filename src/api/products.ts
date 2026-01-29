import { Phone } from '../types/Phone';

type ProductCategory = 'phones' | 'tablets' | 'accessories';

const getRandomItems = <T>(items: T[], count: number): T[] => {
  const randomItems = [...items];

  for (let i = randomItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [randomItems[i], randomItems[j]] = [randomItems[j], randomItems[i]];
  }

  return randomItems.slice(0, count);
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
