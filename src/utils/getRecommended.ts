import { Product } from '../types/Product';

export const getRecommendedPhones = (products: Product[]): Product[] => {
  return products.filter(product => product.category === 'phones');
};

export const getRecommendedTablets = (products: Product[]): Product[] => {
  return products.filter(product => product.category === 'tablets');
};

export const getRecommendedAccessories = (products: Product[]): Product[] => {
  return products.filter(product => product.category === 'accessories');
};
