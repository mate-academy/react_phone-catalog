import { Product } from '../types/Product';

const BASE = import.meta.env.BASE_URL;

export async function getProductById(id: string): Promise<Product | null> {
  const files = ['phones.json', 'tablets.json', 'accessories.json'];

  for (const file of files) {
    try {
      const res = await fetch(`${BASE}api/${file}`);
      const data: Product[] = await res.json();
      const found = data.find(p => p.id === id);

      if (found) {
        return found;
      }
    } catch {
      // skip if file not found
    }
  }

  return null;
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const res = await fetch(`${BASE}api/${category}.json`);

  return res.json();
}

export function getSuggestedProducts(
  allProducts: Product[],
  currentId: string,
  count = 4,
): Product[] {
  const others = allProducts.filter(p => p.id !== currentId);
  const shuffled = [...others].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count);
}
