import { getAllProducts } from '../api/products';
import { Product } from '../types/Product';

export const getSuggestedNewModels = async (): Promise<Product[]> => {
  try {
    const response = await getAllProducts();
    const shulledProducts = response.sort(() => Math.random() - 0.5);
    const suggestedProducts = shulledProducts.slice(0, 10);

    return suggestedProducts;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch suggested products', error);

    return [];
  }
};
