import { Category, Product, ProductDetails } from '../types';

const API = `${import.meta.env.BASE_URL}api`;

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }

  return response.json() as Promise<T>;
}

let productsCache: Product[] | null = null;
const detailsCache: Partial<Record<Category, ProductDetails[]>> = {};

function hashString(value: string): number {
  let hash = 0;

  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }

  return hash;
}

export async function getProducts(): Promise<Product[]> {
  if (!productsCache) {
    productsCache = await getJson<Product[]>(`${API}/products.json`);
  }

  return productsCache;
}

export async function getProductsByCategory(
  category: Category,
): Promise<Product[]> {
  const products = await getProducts();

  return products.filter(product => product.category === category);
}

export async function getCategoryDetails(
  category: Category,
): Promise<ProductDetails[]> {
  if (!detailsCache[category]) {
    detailsCache[category] = await getJson<ProductDetails[]>(
      `${API}/${category}.json`,
    );
  }

  return detailsCache[category] || [];
}

export async function getProductDetails(
  productId: string,
): Promise<ProductDetails | null> {
  const categories: Category[] = ['phones', 'tablets', 'accessories'];

  for (const category of categories) {
    const list = await getCategoryDetails(category);
    const found = list.find(item => item.id === productId);

    if (found) {
      return found;
    }
  }

  return null;
}

export async function getSuggestedProducts(
  productId: string,
): Promise<Product[]> {
  const products = await getProducts();
  const filtered = products.filter(item => item.itemId !== productId);
  const seed = hashString(productId);

  return [...filtered]
    .sort(
      (a, b) => (hashString(a.itemId) ^ seed) - (hashString(b.itemId) ^ seed),
    )
    .slice(0, 12);
}
