import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { httpClient } from '../utils/httpClient';

export const getProducts = () => {
  return httpClient<Product[]>('/products.json');
};

export const getProductDetails = (category: string) => {
  const apiMap: Record<string, string> = {
    phones: '/phones.json',
    tablets: '/tablets.json',
    accessories: '/accessories.json',
  };

  const endpoint = apiMap[category];

  return httpClient<ProductDetails[]>(endpoint);
};
