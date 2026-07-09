import { Product } from '../types/Product';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${import.meta.env.BASE_URL}api/products.json`);

  return response.json();
};
