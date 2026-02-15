import { getAllProducts } from '../api/products';
import { Product } from '../types/Product';

export const getHotPrices = async (): Promise<Product[]> => {
  try {
    const products = await getAllProducts();

    const sortedProducts = products.sort(
      (a: Product, b: Product) =>
        b.fullPrice - b.price - (a.fullPrice - a.price),
    );
    const suggestedProducts = sortedProducts.slice(0, 12);

    return suggestedProducts;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch suggested products', error);

    return [];
  }
};
