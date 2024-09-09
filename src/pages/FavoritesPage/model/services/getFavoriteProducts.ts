import { fetchProducts, Product } from '../../../../entities/Product';

export const getFavoriteProducts = async (): Promise<Product[]> => {
  let response = await fetchProducts();

  if (Array.isArray(response)) {
    response = [...response].filter(item => item.favorite);

    return response;
  }

  return [];
};
