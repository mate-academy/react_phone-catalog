/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import {
  fetchProducts,
  Product,
  ProductInfo,
} from '../../../../entities/Product';

export const getFavoriteProducts = async (
  productsInfo: ProductInfo[],
): Promise<Product[]> => {
  let response = await fetchProducts(productsInfo);

  if (Array.isArray(response)) {
    response = [...response].filter(item => item.favorite);

    return response;
  }

  return [];
};
