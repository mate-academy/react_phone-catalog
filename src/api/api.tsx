import axios from 'axios';
import { Product, ProductDetail } from '../types/Product';

// eslint-disable-next-line
  const URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';
// eslint-disable-next-line
  const PRODUCT = 'https://mate-academy.github.io/react_phone-catalog/_new/products/';

export const getProducts = async (): Promise<Product[]> => {
  const response: Product[] = (await axios.get(URL)).data;

  return response;
};

// eslint-disable-next-line
export const getCurrentProductById = async (id: string): Promise<Product | undefined> => {
  const response: Product[] = (await axios.get(URL)).data;
  const current = response.find(item => item.id === id);

  return current;
};

export const getHotPriceProducts = async (): Promise<Product[]> => {
  const response: Product[] = (await axios.get(URL)).data;
  const sorted = (response.sort((a, b) => a.fullPrice - b.fullPrice));

  return sorted;
};

// eslint-disable-next-line
export const getBrandNewProducts = async (): Promise<Product[]> => {
  const response: Product[] = (await axios.get(URL)).data;
  const sorted = response.sort((a, b) => b.price - a.price);

  return sorted;
};

// eslint-disable-next-line
export const getProductById = async (productId: string): Promise<ProductDetail> => {
  const response: ProductDetail = (await axios.get(`${PRODUCT}${productId}.json`)).data;

  return response;
};
