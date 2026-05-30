import { Gadget } from '../types/Gadget';
import { getData } from './httpClient';

export const getHotPrices = async (): Promise<Gadget[]> => {
  try {
    const products = await getData<Gadget[]>('api/products.json');

    const sortedProducts = products.sort(
      (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
    );
    const suggestedProducts = sortedProducts.slice(0, 12);

    return suggestedProducts;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch suggested products', error);

    return [];
  }
};
