import { Gadget } from '../types/Gadget';
import { getData } from './httpClient';

export const getNewModels = async (): Promise<Gadget[]> => {
  try {
    const products = await getData<Gadget[]>('api/products.json');

    const filteredProducts = products.filter(product => product.year >= 2022);
    const sortedByPrice = filteredProducts.sort(
      (a, b) => b.fullPrice - a.fullPrice,
    );
    const suggestedProducts = sortedByPrice.slice(0, 12);

    return suggestedProducts;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch suggested products', error);

    return [];
  }
};
