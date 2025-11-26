import { Categories } from '../types/Categories';
import { Product } from '../types/Product';

export const getProducts = async (): Promise<Product[]> => {
  return fetch('/api/products.json').then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  });
};

export const getProductsByCategory = async (
  category: Categories,
): Promise<Product[]> => {
  const response = await fetch(`/api/${category}.json`);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};
