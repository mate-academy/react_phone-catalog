import { Product, ProductDetailsType } from '../types/types';

const BASE = import.meta.env.DEV ? '/' : '/react_phone-catalog/';

export const getProducts = async (): Promise<Product[]> => {
  // const response = await fetch('/api/products.json');
  const response = await fetch(`${BASE}api/products.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};

export const getCategoryOfProducts = async (
  category: string | undefined,
): Promise<Product[]> => {
  const products = await getProducts();

  return products.filter(item => item.category === category);
};

export const getProductDetailsById = async (
  category: string,
  productId: string | undefined,
): Promise<ProductDetailsType | undefined> => {
  const response = await fetch(`${BASE}api/${category}.json`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${category}`);
  }

  const data: ProductDetailsType[] = await response.json();

  return data.find(item => item.id === productId);
};
