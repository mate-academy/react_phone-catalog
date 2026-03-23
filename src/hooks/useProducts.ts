import { Product } from '@/types';
import ProductsData from '../../public/api/products.json';

export const useProducts = () => {
  return ProductsData as Product[];
};
