import { shuffle } from 'lodash';
import { Product } from '../types/Product';
import { ProductCategory } from '../types/ProductCategory';
import { ProductDetails } from '../types/ProductDetails';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getProducts(): Promise<Product[]> {
  await wait(500);

  const response = await fetch('./api/products.json');

  return response.json();
}

export async function getSuggestedProducts(
  category: ProductCategory,
  currentProductId: string,
): Promise<Product[]> {
  const items = await getProducts();

  return shuffle(
    items
      .filter(item => item.category === category)
      .filter(item => item.itemId !== currentProductId),
  );
}

export async function getProductsByCategory(
  productCategory: ProductCategory,
): Promise<ProductDetails[]> {
  await wait(500);

  const response = await fetch(`./api/${productCategory}.json`);

  return response.json();
}
