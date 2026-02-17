import { CategoryName } from '../types/Categories';
import { ProductDetail } from '../types/ProductDetail';
import { request } from '../utils/fetchData';

export const getProductDetails = async (category: CategoryName) => {
  return request<ProductDetail[]>(`${category}.json`);
};
