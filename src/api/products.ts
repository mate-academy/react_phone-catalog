import { Category } from '../types/Category';
import { ProductSpecs } from '../types/ProductSpecs';
import { ProductSummary } from '../types/ProductSummary';

export async function getProductsSummary(): Promise<ProductSummary[]> {
  const response = await fetch(`http://localhost:3000/api/products.json`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export async function getProducts(catId: string): Promise<ProductSpecs[]> {
  const response = await fetch(`http://localhost:3000/api/${catId}.json`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export async function getCategories(): Promise<Category[]> {
  const products = await getProductsSummary();
  const categoryIds = Array.from(new Set(products.map(p => p.category)));

  const categories = categoryIds.map(cat => ({
    id: cat,
    title: cat.charAt(0).toUpperCase() + cat.slice(1),
    bannerImg: `public/img/category-${cat}-sqr.png`,
    products: products.filter(p => p.category === cat),
    productsCount: products.filter(p => p.category === cat).length,
  }));

  return categories;
}

export async function getCategoryByCatId(categoryId: string) {
  const categories = await getCategories();

  return categories.find(cat => cat.id === categoryId);
}

export async function getProductsByCatId(
  categoryId: string,
): Promise<ProductSummary[]> {
  const products = await getProductsSummary();

  return products.filter(p => p.category === categoryId);
}

export async function locateProduct(
  prodId: string,
  catId: string,
): Promise<ProductSpecs | undefined> {
  const products = await getProducts(catId);

  return products.find((p: ProductSpecs) => p.id === prodId);
}
