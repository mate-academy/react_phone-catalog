import { Product } from '../types/product';

export const fetchProducts = async (): Promise<Product[] | string> => {
  try {
    const response = await fetch(
      'http://localhost:3000/api/products.json',
    ).then(res => res.json());

    return response;
  } catch (e) {
    return 'error';
  }
};
