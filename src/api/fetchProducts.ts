import { Products } from 'src/types/products';

export const fetchProducts = async (): Promise<Products[]> => {
  try {
    const response = await fetch('/api/products.json');

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const products: Products[] = await response.json();

    return products;
  } catch (error) {
    console.error(error);

    return [];
  }
};
