import { Product, ProductDetails } from '../types/Product';

const BASE_URL = 'https://phone-catalog-backend-k2qc.onrender.com';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/api/products`);
  return response.json();
};

export const getPhones = async (): Promise<Product[]> => {
  const products = await getProducts();
  return products.filter((product) => product.category === 'phones');
};

export const getTablets = async (): Promise<Product[]> => {
  const products = await getProducts();
  return products.filter((product) => product.category === 'tablets');
};

export const getAccessories = async (): Promise<Product[]> => {
  const products = await getProducts();
  return products.filter((product) => product.category === 'accessories');
};

export const getProductDetails = async (
  _category: string,
  itemId: string,
): Promise<ProductDetails> => {
  const response = await fetch(`${BASE_URL}/api/products/${itemId}`);

  if (!response.ok) {
    throw new Error(`Product not found: ${itemId}`);
  }

  return response.json();
};
