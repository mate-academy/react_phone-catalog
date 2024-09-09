/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import { fetchProducts, Product } from '../../../../entities/Product';

export const getCartProducts = async (): Promise<Product[]> => {
  let response = await fetchProducts();

  if (Array.isArray(response)) {
    response = [...response].filter(item => item.cartItem);

    return response;
  }

  return [];
};
