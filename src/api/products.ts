import { Category } from "../definitions/enums/Category";
import { Product } from '../definitions/types/Product';
import { request } from '../utils/axiosHelper';

export const getProducts = (category: Category) => {
  return request<Product[]>(`categories/${category}/products.json`);
};

export const getProductById = (category: Category, productId: string) => {
  return request<Product>(`categories/${category}/products/${productId}.json`);
};
