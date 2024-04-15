import { Product } from '../types/Product';
import { getData } from '../utils/httpClient';

export const getAllProducts = async (): Promise<Product[]> => {
  return getData<Product[]>('/api/products.json');
};

export const getProductsByCategory = async (category: string) => {
  const products = await getData<Product[]>('/api/products.json');

  return products.filter((product: Product) => product.category === category);
};

export const getHotPriceProducts = async () => {
  const response = await getData<Product[]>('/api/products.json');

  return response.sort((a: Product, b: Product) => {
    return b.fullPrice - b.price - (a.fullPrice - a.price);
  });
};

export const getNewProducts = async () => {
  const response = await getData<Product[]>('/api/products.json');
  const latestYear = response.reduce(
    (acc: number, product: Product) => Math.max(acc, product.year),
    0,
  );

  return response
    .filter((product: Product) => product.year === latestYear)
    .sort((a: Product, b: Product) => b.fullPrice - a.fullPrice);
};

const shuffleArray = (array: Product[]) => {
  const shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};

export const getSuggestedProducts = async () => {
  const products = await getData<Product[]>('/api/products.json');
  const suggestedProducts = shuffleArray(products);

  return suggestedProducts;
};
