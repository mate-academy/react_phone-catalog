import { Product } from '../types/Product';

export const getProducts = (): Promise<Product[]> => {
  return fetch('api/products.json').then(response => {
    if (!response.ok) {
      throw new Error('Failed to load products');
    }

    return response.json();
  });
};

export const getSuggestedProducts = (): Promise<Product[]> => {
  return getProducts().then(products => {
    const result = [...products].sort(() => Math.random() - 0.5);

    return result.slice(0, 8);
  });
};
