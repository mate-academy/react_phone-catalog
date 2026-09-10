import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { getAssetUrl } from '../utils/getAssetUrl';

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(getAssetUrl('api/products.json'));

  if (!response.ok) {
    throw new Error('Failed to fetch products list');
  }

  return response.json();
}

export async function getProductDetails(
  productId: string,
): Promise<ProductDetails> {
  const response = await fetch(getAssetUrl(`api/products/${productId}.json`));

  if (!response.ok) {
    throw new Error('Failed to fetch product details');
  }

  return response.json();
}
