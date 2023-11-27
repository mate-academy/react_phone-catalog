/* eslint-disable max-len */
import axios from 'axios';
import { Product, ProductDetails } from '../types/Product';

const URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';
const PRODUCT = 'https://mate-academy.github.io/react_phone-catalog/_new/products/';

export const getProducts = async (): Promise<Product[]> => {
  const response: Product[] = (await axios.get(URL)).data;

  return response;
};

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

export const getBrandNewProducts = async (): Promise<Product[]> => {
  const response: Product[] = (await axios.get(URL)).data;
  const sorted = response.sort((a, b) => b.price - a.price);

  return sorted;
};

export const getProductById = async (productId: string): Promise<ProductDetails> => {
  const response: ProductDetails = (await axios.get(`${PRODUCT}${productId}.json`)).data;

  return response;
};
