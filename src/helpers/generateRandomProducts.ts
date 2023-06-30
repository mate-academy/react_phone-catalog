import { Product } from '../types/product';

export const generateRandomProducts = (initialProducts: Product[]) => {
  const newRandomProducts: Product[] = [];
  let randomIndex = Math.floor(Math.random() * initialProducts.length);

  while (new Set(newRandomProducts).size !== 11) {
    newRandomProducts.push(initialProducts[randomIndex]);

    randomIndex = Math.floor(Math.random() * initialProducts.length);
  }

  return [...new Set(newRandomProducts)];
};
