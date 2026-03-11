import { getAccessories, getPhones, getTablets } from './products';
import { Product } from '../types/Product';

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const [phones, tablets, accessories] = await Promise.all([
      getPhones(),
      getTablets(),
      getAccessories(),
    ]);
    return [...phones, ...tablets, ...accessories];
  } catch (error) {
    console.error('Помилка завантаження:', error);
    return [];
  }
};
