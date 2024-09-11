/* eslint-disable @typescript-eslint/indent */
import { modernizationProducts } from './modernizationProduct';
import { Product } from '../types/product';

export const fetchProducts = async (): Promise<Product[] | string> => {
  try {
    const response = await fetch('api/products.json').then(res => res.json());

    if (!Array.isArray(response)) {
      return 'bad response';
    }

    const result = modernizationProducts(response);

    return result;
  } catch (e) {
    return 'error';
  }
};
