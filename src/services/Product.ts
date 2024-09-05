import { Product } from '../types/Product';
import { ShuffleArray } from '../utils/ShuffleArray';
import { getData } from '../utils/client';

export const getAllProduct = async (): Promise<Product[]> => {
  return getData<Product[]>('./api/products.json');
};

export const getHotPriceProducts = () => {
  return getData<Product[]>('./api/products.json').then(res => res);
};

export const getNewProducts = async () => {
  const response = await getData<Product[]>('./api/products.json');
  const latestYear = response.reduce(
    (acc: number, product: Product) => Math.max(acc, product.year),
    0,
  );

  return response
    .filter((product: Product) => product.year === latestYear)
    .sort((a: Product, b: Product) => b.fullPrice - a.fullPrice);
};

export const getProductsByCategory = async (category: string) => {
  const products = await getData<Product[]>('/api/products.json');

  return products.filter((product: Product) => product.category === category);
};

export const getSuggestedProducts = async () => {
  const products = await getData<Product[]>('/api/products.json');
  const suggestedProducts = ShuffleArray(products);

  return suggestedProducts;
};
