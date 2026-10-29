import { Product, ProductDetails, Category } from '../types';

export function timer(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function loadProducts(): Promise<Product[]> {
  await timer(500);

  const response = await fetch('api/products.json');

  if (!response.ok) {
    throw new Error('Failed to load products');
  }

  const data = await response.json();

  return data;
}

export async function loadProductDetails(
  category: Category,
): Promise<ProductDetails[]> {
  await timer(500);

  const response = await fetch(`api/${category}.json`);

  if (!response.ok) {
    throw new Error('Failed to load products');
  }

  const data = await response.json();

  return data;
}

export async function getSuggestedProducts(count = 10): Promise<Product[]> {
  const products = await loadProducts();
  const shuffled = [...products].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count);
}

export async function getProductCategory(
  category: Category,
): Promise<Product[]> {
  return (await loadProducts()).filter(
    product => product.category === category,
  );
}

export async function getProductById(
  productId: string,
): Promise<ProductDetails | null> {
  const products = await loadProducts();

  const productOne = products.find(product => product.itemId === productId);

  if (!productOne) {
    return null;
  }

  const productCategory = productOne?.category;

  const productById = (await loadProductDetails(productCategory)).find(
    pc => pc.id === productId,
  );

  if (!productById) {
    return null;
  }

  return productById;
}
