import { Product, ProductDetail } from '../types/Product';

const cache: Record<string, ProductDetail> = {};

export const getPhones = async (): Promise<ProductDetail[]> => {
  const response = await fetch('/api/phones.json');

  if (!response.ok) {
    throw new Error('Failed to retrieve phones from the server');
  }

  return response.json();
};

export const getAccessories = async (): Promise<ProductDetail[]> => {
  const response = await fetch('/api/accessories.json');

  if (!response.ok) {
    throw new Error('Failed to retrieve accessories from the server');
  }

  return response.json();
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('/api/products.json');

  if (!response.ok) {
    throw new Error('Failed to retrieve products from the server');
  }

  return response.json();
};

export const getTablets = async (): Promise<ProductDetail[]> => {
  const response = await fetch('/api/tablets.json');

  if (!response.ok) {
    throw new Error('Failed to retrieve tablets from the server');
  }

  return response.json();
};

export const getProductById = async (
  productId: string,
): Promise<ProductDetail> => {
  if (cache[productId]) {
    return cache[productId];
  }

  const [phones, tablets, accessories] = await Promise.all([
    getPhones().catch(() => []),
    getTablets().catch(() => []),
    getAccessories().catch(() => []),
  ]);

  const allDetails = [...phones, ...tablets, ...accessories];

  const product = allDetails.find(item => item.id === productId);

  if (!product) {
    throw new Error('Product not found');
  }

  cache[productId] = product;

  return product;
};
