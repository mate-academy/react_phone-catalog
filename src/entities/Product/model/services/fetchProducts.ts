/* eslint-disable @typescript-eslint/indent */
import { modernizationProducts } from './modernizationProduct';
import { Product, ProductFromServer } from '../types/product';

export const fetchProducts = async () // productsInfo: ProductInfo[],
: Promise<Product[] | string> => {
  try {
    const response: ProductFromServer[] = await fetch(
      'http://localhost:3000/api/products.json',
    ).then(res => res.json());

    if (!Array.isArray(response)) {
      return 'bad response';
    }

    const result = modernizationProducts(response);

    return result;
  } catch (e) {
    return 'error';
  }
};
