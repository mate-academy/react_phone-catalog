import type { ProductListItem, Category } from './types';

export async function getSuggestedProducts(
  category: Category,
  excludeId?: string,
  count = 8,
): Promise<ProductListItem[]> {
  const res = await fetch('/api/products.json');

  if (!res.ok) {
    throw new Error('Failed to load products');
  }

  const all = (await res.json()) as ProductListItem[];
  const pool = all.filter(
    p => p.category === category && p.itemId !== excludeId,
  );

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, count);
}
