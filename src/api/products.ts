import { Category } from "../definitions/enums/Category";
import { Product } from '../definitions/types/Product';
import { ProductDetails } from "../definitions/types/ProductDetails";
import { request } from '../utils/fetchHelper';

export const getProducts = (category: Category) => {
  return request<Product[]>(`categories/${category}/products.json`);
};

export const getProductById = (category: Category, productId: string) => {
  const url = `categories/${category}/products/${productId}.json`;

  return request<ProductDetails>(url);
};
