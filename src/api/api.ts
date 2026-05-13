/* eslint-disable max-len */
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

import productsData from './products.json';
import phonesData from './phones.json';

export const getProducts = async (): Promise<Product[]> => {
  return productsData as unknown as Product[];
};

export const getProductsDetails = async (): Promise<ProductDetails[]> => {
  return phonesData as unknown as ProductDetails[];
};
