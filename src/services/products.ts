import type { Product, ProductDetails } from '../types';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('/api/products.json');

  if (!response.ok) {
    throw new Error('Unable to load products');
  }

  const products: Product[] = await response.json();

  return products;
};

export const getPhoneDetails = async (
  productId: string,
): Promise<ProductDetails | undefined> => {
  const response = await fetch('/api/phones.json');

  if (!response.ok) {
    throw new Error('Unable to load phone details');
  }

  const phones: ProductDetails[] = await response.json();

  return phones.find(phone => phone.id === productId);
};
