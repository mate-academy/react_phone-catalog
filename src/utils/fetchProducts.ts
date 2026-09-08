import { Product } from '../types/Product';
import { getProducts } from './getData';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const loadedProducts = await getProducts();

    return loadedProducts.sort(
      (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
    );
  } catch {
    throw new Error('Something went wrong while loading products');
  }
};
