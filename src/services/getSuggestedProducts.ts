import { Gadget } from '../types/Gadget';
import { getData } from './httpClient';

export const getSuggestedProducts = async (): Promise<Gadget[]> => {
  try {
    const products = await getData<Gadget[]>('api/products.json');

    const shuffledProducts = products.sort(() => 0.5 - Math.random());
    const suggestedProducts = shuffledProducts.slice(0, 10);

    return suggestedProducts;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch suggested products', error);

    return [];
  }
};
