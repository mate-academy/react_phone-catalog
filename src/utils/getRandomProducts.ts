import { Product } from '../types/Product';

export const getRandomProducts = (products: Product[]) => {
  const randomProducts = products.slice();

  for (let i = randomProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [randomProducts[i], randomProducts[j]] = [
      randomProducts[j],
      randomProducts[i],
    ];
  }

  return randomProducts;
};
