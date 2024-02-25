import { IProduct } from '../types';
import { client } from '../utils/fetchClient';

export const getSuggestedProducts = async () => {
  const products = await client.get<IProduct[]>('/api/products.json');

  let currentIndex = products.length;
  let randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [products[currentIndex], products[randomIndex]] = [
      products[randomIndex], products[currentIndex]];
  }

  return products;
};
