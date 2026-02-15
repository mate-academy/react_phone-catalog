import { getAllProducts } from '../api/products';
import { Product } from '../types/Product';

export const getNewModels = async (): Promise<Product[]> => {
  try {
    const response = await getAllProducts();
    const products: Product[] = response;

    const filteredProducts = products.filter(product => product.year >= 2022);
    const sortedProducts = filteredProducts.sort(
      (a, b) => b.fullPrice - a.fullPrice,
    );

    const suggestedProducts = sortedProducts.slice(0, 12);

    return suggestedProducts;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch suggested products', error);

    return [];
  }
};
