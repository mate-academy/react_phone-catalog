import { Product } from '../../../types/product';

export function getBrandNewModels(products: Product[], count = 4): Product[] {
  const sorted = [...products]
    .filter(p => p.year !== undefined)
    .sort((a, b) => b.year - a.year || b.id - a.id);

  const seen = new Set<string>();
  const result: Product[] = [];

  for (const p of sorted) {
    const key = p.itemId ?? p.name;

    if (!seen.has(key)) {
      seen.add(key);
      result.push(p);
    }

    if (result.length >= count) {
      break;
    }
  }

  return result;
}
