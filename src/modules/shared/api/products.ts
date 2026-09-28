import { request } from '../utils/httpClient';
import type { Product, ProductCategory, ProductDetails } from '../types';

export function getProducts() {
  return request<Product[]>('/products.json');
}

export async function getProductsByCategory(category: ProductCategory) {
  const products = await getProducts();

  return products.filter(item => item.category === category);
}

export function getProductDetailsByCategory(
  category: ProductCategory,
  productId: string,
) {
  return request<ProductDetails[]>(`/${category}.json`).then(
    items => items.find(item => item.id === productId) || null,
  );
}

export async function getProductDetails(productId: string) {
  const products = await getProducts();
  const match = products.find(item => item.itemId === productId);

  if (!match) {
    return null;
  }

  return getProductDetailsByCategory(match.category, productId);
}

export function getSuggestedProducts(
  allProducts: Product[],
  currentItemId: string,
  amount = 8,
) {
  const rest = allProducts.filter(item => item.itemId !== currentItemId);
  const shuffled = [...rest].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, amount);
}
