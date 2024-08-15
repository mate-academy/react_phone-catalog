import { API_PRODUCTS } from '../constants/api';
import { Categories } from '../types/Categories';
import { Product } from '../types/Product';
import { httpRequest } from '../utils/httpRequest';

export const getAllProducts = (): Promise<Product[]> => {
  return httpRequest(API_PRODUCTS);
};

export const getProducts = async (type: Categories) => {
  const responce = await getAllProducts();

  const result = responce.filter(product => product.category === type);

  return result;
};
