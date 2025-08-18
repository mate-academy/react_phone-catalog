import { Product } from '../types/Product';

export async function getProductById(
  itemId: string,
): Promise<Product | undefined> {
  const resp = await fetch('./api/products.json');
  const all: Product[] = await resp.json();

  return all.find(p => p.itemId === itemId);
}

export async function getSuggestedProducts(): Promise<Product[]> {
  const resp = await fetch('./api/products.json');
  const all: Product[] = await resp.json();

  return all.sort(() => 0.5 - Math.random()).slice(0, 6);
}
