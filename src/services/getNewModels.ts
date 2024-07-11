import { Gadget } from '../types/Gadget';
import { getData } from './httpClient';

export const getNewModels = async (): Promise<Gadget[]> => {
  try {
    const products = await getData<Gadget[]>('api/products.json');

    const filteredProducts = products.filter(product => product.year >= 2022);
    const shuffledProducts = filteredProducts.sort(() => 0.5 - Math.random());
    const suggestedProducts = shuffledProducts.slice(0, 12);

    return suggestedProducts;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch suggested products', error);

    return [];
  }
};
