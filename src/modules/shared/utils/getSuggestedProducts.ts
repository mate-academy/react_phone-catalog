import { Product } from '../types/Product';

export async function getSuggestedProducts(
  currentId: string,
  allProducts: Product[],
  { count = 4 } = {},
): Promise<Product[]> {
  const current = allProducts.find(p => p.itemId === currentId);

  if (!current) {
    return [];
  }

  const others = allProducts.filter(p => p.itemId !== currentId);

  const sameCategory = others.filter(p => p.category === current.category);

  const sameYear = sameCategory.filter(
    p => p.year === current.year + 1 || p.year === current.year - 1,
  );

  const suggested = [...sameYear];

  if (suggested.length < count) {
    suggested.push(...sameCategory.filter(p => !suggested.includes(p)));
  }

  if (suggested.length < count) {
    const randomOthers = others
      .filter(p => !suggested.includes(p))
      .sort(() => Math.random() - 0.5);

    suggested.push(...randomOthers);
  }

  return suggested.sort(() => Math.random() - 0.5).slice(0, count);
}
