import { Product } from '@/features/products/types/product';

export const getNewestModels = (
  products: Product[],
  limit: number = 10,
): Product[] => {
  const sorted = [...products].sort((a, b) => {
    if (b.year !== a.year) {
      return b.year - a.year;
    }

    return b.price - a.price;
  });

  const uniqueModels: Product[] = [];
  const seenModels = new Set<string>();

  for (const phone of sorted) {
    const modelKey = phone.name.replace(/\d+(GB|TB)/g, '').trim();

    if (!seenModels.has(modelKey)) {
      uniqueModels.push(phone);
      seenModels.add(modelKey);
    }

    if (uniqueModels.length === limit) {
      break;
    }
  }

  return uniqueModels;
};
