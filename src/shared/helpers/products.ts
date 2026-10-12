import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';

const BASE_URL = `${import.meta.env.BASE_URL}/api/`;

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}products.json`);

  if (!response.ok) {
    throw new Error('Failed to load products');
  }

  return response.json();
};

export const getProductDetails = async (
  itemId: string,
): Promise<ProductDetails> => {
  const response = await fetch(`${BASE_URL}products/${itemId}.json`);

  if (!response.ok) {
    throw new Error('Failed to load product details');
  }

  return response.json();
};
