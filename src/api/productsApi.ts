import { ApiRoutes } from '@enums/ApiRoutes';
import { ProductType } from 'types/productTypes';

const BASE_URL = 'public/api/';

export const getProducts = async (): Promise<ProductType[]> => {
  const response = await fetch(BASE_URL + ApiRoutes.PRODUCTS);

  if (!response.ok) {
    throw new Error('Failed to get products');
  }

  return response.json();
};
