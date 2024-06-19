import { API_PRODUCTS } from '../constants/api';
import { Categories } from '../types/Categories';
import { Product } from '../types/Product';
import { request } from '../utils/utils';

export const getAllProducts = (): Promise<Product[]> => {
  return request<Product[]>(API_PRODUCTS);
};

export const getProducts = async (type: Categories) => {
  const responce = await getAllProducts();

  const result = responce.filter(product => product.category === type);

  return result;
};
