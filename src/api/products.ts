import { Product } from '../types/product';
import { client } from '../utils/axiosClient';

export const getProductsCards = () => {
  return client.get<Product[]>('/products.json');
};

export const getNewProducts = () => {
  return getProductsCards().then(res => {
    return res.sort((p1, p2) => p2.price - p1.price);
  });
};

export const getDiscountProducts = () => {
  return getProductsCards().then(res => {
    return res.sort((p1, p2) => p2.fullPrice - p1.fullPrice);
  });
};
