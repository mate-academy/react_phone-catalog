import { ProductDetails } from '../features/types/productDetailsType';
import { Product, ProductCategory } from '../features/types/productType';
import { getData } from '../features/utils/client';

const DETAILS_FILE_BY_CATEGORY: Record<ProductCategory, string> = {
  phones: '/api/phones.json',
  tablets: '/api/tablets.json',
  accessories: '/api/accessories.json',
};

export function getProducts(): Promise<Product[]> {
  return getData<Product[]>('/api/products.json');
}

export async function getProductDetails(
  category: ProductCategory,
  productId: string,
): Promise<ProductDetails> {
  const url = DETAILS_FILE_BY_CATEGORY[category];

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to load details');
  }

  const all: ProductDetails[] = await res.json();
  const found = all.find(p => p.id === productId);

  if (!found) {
    throw new Error('Product not found');
  }

  return found;
}
