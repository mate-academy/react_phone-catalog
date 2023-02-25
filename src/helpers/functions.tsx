import { Product } from '../types/Product';

export const getSaleItems = (data: Product[]) => {
  const sortedData = data.sort((a, b) => (b.fullPrice - b.price)
    - (a.fullPrice - b.fullPrice)).slice(0, 18)
    .sort(() => (Math.random() - 0.5));

  return sortedData;
};

export const getNewItems = (data: Product[]) => {
  const sortedData = data.sort((a, b) => b.year - a.year).slice(0, 18);

  return sortedData;
};

export const getProductsQuantity = (category: string, data: Product[]) => {
  return data.filter(el => el.category === category).length;
};

export const setAlsoLikeProducts = (data: Product[]) => {
  return data.slice(0, 18).sort(() => (Math.random() - 0.5));
};
