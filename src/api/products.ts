import { Category, Product, ProductDetails, SortOption } from '../types/Product';

const BASE = 'api';

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  return response.json();
}

export function getProducts(): Promise<Product[]> {
  return fetchJson<Product[]>(`${BASE}/products.json`);
}

export function getProductsByCategory(category: Category): Promise<Product[]> {
  return getProducts().then(products =>
    products.filter(product => product.category === category),
  );
}

export async function getProductDetails(
  productId: string,
): Promise<ProductDetails | null> {
  const products = await getProducts();
  const product = products.find(item => item.itemId === productId);

  if (!product) {
    return null;
  }

  const details = await fetchJson<ProductDetails[]>(
    `${BASE}/${product.category}.json`,
  );

  return details.find(item => item.id === productId) ?? null;
}

export async function getSuggestedProducts(
  currentId: string,
): Promise<Product[]> {
  const products = await getProducts();
  const others = products.filter(product => product.itemId !== currentId);

  return [...others].sort(() => Math.random() - 0.5).slice(0, 16);
}

export function getHotPriceProducts(products: Product[]): Product[] {
  return [...products]
    .filter(product => product.fullPrice > product.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));
}

export function getBrandNewProducts(products: Product[]): Product[] {
  return [...products].sort((a, b) => b.year - a.year);
}

export function sortProducts(
  products: Product[],
  sortBy: SortOption,
): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'age':
      return sorted.sort((a, b) => b.year - a.year);
    case 'title':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return sorted.sort((a, b) => a.price - b.price);
    default:
      return sorted;
  }
}

export function getDiscount(product: Product): number {
  return product.fullPrice - product.price;
}
