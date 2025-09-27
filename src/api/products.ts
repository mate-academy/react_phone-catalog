import { Product } from '../types/Product';
import { ProductData } from '../types/ProductData';
import { getData } from '../utils/fetchClient';

export const getProducts = () => {
  return getData<Product[]>('api/products.json');
};

export const getCategoryData = (categoryData: string | undefined) => {
  return getData<ProductData[]>(`api/${categoryData}.json`);
};
