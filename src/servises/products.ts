import { Product } from '../types/Product';
import { getData } from '../utils/httpClient';

export const getAllProducts = getData<Product[]>('/api/products.json');

export const getProductsByCategory = async (category: string) => {
  const products = await getAllProducts;

  return products.filter(product => product.category === category);
};

export const getHotPriceProducts = async () => {
  const products = await getAllProducts;

  return products.sort(
    (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
  );
};

export const getNewProducts = async () => {
  const products = await getAllProducts;
  const latestYear = Math.max(...products.map(product => product.year));

  return products
    .filter(p => p.year === latestYear)
    .sort((a, b) => b.fullPrice - a.fullPrice);
};

export const getProductById = async (id: string) => {
  const products = await getAllProducts;

  return products.find(p => p.itemId === id) || null;
};

export const getSuggestedProducts = async () => {
  const products = await getAllProducts;

  return products.filter(() => Math.random() > 0.5);
};
