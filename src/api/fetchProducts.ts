import type { Category, Product, ProductDetails } from '../types';

const BASE = `${import.meta.env.BASE_URL}api`;

const toAbsolute = (p: string) =>
  `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`;

export async function fetchAllProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE}/products.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = (await response.json()) as Product[];
  return data.map((p) => ({ ...p, image: toAbsolute(p.image) }));
}

export async function fetchProductsByCategory(
  category: Category,
): Promise<ProductDetails[]> {
  const response = await fetch(`${BASE}/${category}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${category}`);
  }
  const data = (await response.json()) as ProductDetails[];
  return data.map((p) => ({
    ...p,
    images: p.images.map(toAbsolute),
  }));
}

export async function fetchProductById(
  category: Category,
  id: string,
): Promise<ProductDetails> {
  const all = await fetchProductsByCategory(category);
  const product = all.find((p) => p.id === id);
  if (!product) {
    throw new Error(`Product "${id}" not found in ${category}`);
  }
  return product;
}
