import { ProductCatalogItem } from '../types/ProductCatalogItem';
import { request } from '../utils/fetchData';

export const getProducts = () => {
  return request<ProductCatalogItem[]>('products.json');
};
