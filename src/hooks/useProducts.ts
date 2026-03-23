import { Product } from '@/types';
import ProductsData from '@/api/products.json';

export const useProducts = () => {
  return ProductsData as Product[];
};
